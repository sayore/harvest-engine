import { CommonEntity } from "../../lib/CommonEntity";
import { ClientGame } from "./ClientGame";

export class ClientEntity extends CommonEntity {
    game:ClientGame;
    Type:string="NoTypeEntity";
    uuid: string;
    
    //Initialize (only called once at game start)
    initialize() {}
    //GUI Initialize (only called once at game start) AFTER Initiazlize
    guiInit() {}
    
    /**
     * Pre phisics update
     * @param progress time since last update
     */
    preUpdate(progress:number) {};
    /**
     * Update phisics here.
     * @param progress time since last update
     */
    update(progress:number) {};
    /**
     * Update GUI here so it is positioned correctly
     * Also Collisionchecks could go here
     * @param progress time since last update
     */
    postUpdate(progress:number) {};
    
    /**
     * Dead function, will currently loop but do nothing.
     */
    draw() {};
    
    /**
     * Called with real dimensions of the window.
     * @param gamewidth 
     * @param gameheight 
     */
    windowResized(gamewidth: number, gameheight: number) { }

    /**
     * Unload event listeners and graphics.
     */
    unload() {};
    
    remove() {
        this.game.removeEntity(this);
    };
}