import { Game } from "./game";

export class Entity {
    game:Game;
    UniqueIdentifier: string;
    Type:string="NoTypeEntity";

    initialize() {}

    update(progress:number) {};

    draw() {};

    remove() {
        this.game.remove(this);
    };
}