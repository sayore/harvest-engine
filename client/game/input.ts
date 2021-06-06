import { Entity } from "./entity";

/**
 * Streamline JavaScript Events so many Entities can listen to them and also unregister them at any time.
 */
export class InputHandler extends Entity {
    Type="InputHandler";
    PressedKeys: Set<string> = new Set();
    Events: Map<EventTypesAvailable, IndexableEventListener<any>> = new Map([
        [EventTypesAvailable.KeyUp,                 new IndexableEventListener<KeyboardEvent>("keyup")     ],
        [EventTypesAvailable.KeyDown ,              new IndexableEventListener<KeyboardEvent>("keydown")   ],
        [EventTypesAvailable.VisibilityChanged ,    new IndexableEventListener<any>("visibilitychange")   ]
    ]);

    // Register all events here to route them to a single source.
    initialize() {
        this.Events.get(EventTypesAvailable.KeyUp).addListener((event)=>{
            this.PressedKeys.add(event.key);
        })
        this.Events.get(EventTypesAvailable.KeyDown).addListener((event)=>{
            this.PressedKeys.delete(event.key);
        })
        this.Events.get(EventTypesAvailable.VisibilityChanged).addListener((event)=>{
            this.PressedKeys.clear();
        })
    }
}

export enum EventTypesAvailable {
    KeyUp= "keyup",
    KeyDown= "keydown",
    VisibilityChanged= "visibilitychange",
}

class IndexableEventListener<T extends Event> {
    private forwardRunningId=0;
    private listeners:Map<number,(ev:T)=>void>=new Map();
    constructor(eventname:string) {
        window.addEventListener(eventname, (event: T) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }
            
            this.listeners.forEach((listener) => {
                listener(event);
            });

            // Cancel the default action to avoid it being handled twice
            //event.preventDefault();
        }, true);
    }
    /**
     * Register a function to be called.
     * @param func A function to be  called when window triggers an event.
     * @returns A uid to unregister this listener.
     */
    addListener(func:(ev:T)=>void) {
        this.listeners.set(++this.forwardRunningId, func);
        return this.forwardRunningId;
    }
    /**
     * Remove a listener.
     * @param idOfListener 
     */
    removeListener(idOfListener:number) {
        this.listeners.delete(idOfListener);
    }
}