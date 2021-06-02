import { Game } from "./game";

export class Entity {
    game:Game;
    UniqueIdentifier: string;
    Type:string="NoTypeEntity";
    uuid: string;

    initialize() {}

    update(progress:number) {};

    draw() {};

    remove() {
        this.game.remove(this);
    };
}