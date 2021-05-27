import { Socket } from "socket.io-client";
import { Entity } from "./entity";

export class Game {
    public lastRender = 0
    public socket : Socket;
    public entities: Entity[] = [];

    constructor(socket: Socket) {
        window.requestAnimationFrame(this.loop);
        this.socket = socket;
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

    loop(timestamp:number) {
        var progress = timestamp - this.lastRender

        this.update(progress)
        this.draw()

        this.lastRender = timestamp
        window.requestAnimationFrame(this.loop)
    }

    add(entity: Entity) {

    }
}