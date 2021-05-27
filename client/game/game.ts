import { Socket } from "socket.io-client";
import { Entity } from "./entity";

export class Game {
    
    public lastRender = 0
    public socket : Socket;
    public entities: Entity[] = [];
    UniqueIdentifier: any;

    constructor(socket: Socket) {
        window.requestAnimationFrame((ts)=>{this.loop(ts)});
        this.socket = socket;
    }

    initialize() {
        // Initialize
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].initialize();
        }
    }

    update(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(progress);
        }
    }

    draw() {
        // Draw the state of the world
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    }

    loop(timestamp:DOMHighResTimeStamp) {
        var progress = timestamp - this.lastRender

        this.update(progress)
        this.draw()

        this.lastRender = timestamp
        window.requestAnimationFrame((ts)=>{this.loop(ts)}); 
    }

    add(entity: Entity) {
        entity.game = this;
        entity.uuid =""+[0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)]+
                        [0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)]+
                        [0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)]+
                        [0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)];
        this.entities.push(entity);
    }

    remove(entity: Entity) {
        
    }
}