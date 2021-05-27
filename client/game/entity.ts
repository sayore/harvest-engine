import { Game } from "./game";

export class Entity {
    game:Game;
    uuid: string;

    initialize() {}

    update(progress:number) {};

    draw() {};

    remove() {
        this.game.remove(this);
    };
}