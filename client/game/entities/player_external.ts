import { IDrawable } from "../../../lib/interface/IDrawable";
import { Entity } from "../entity";

export class PlayerExternal extends Entity implements IDrawable{
    UniqueIdentifier: any;
    
    Type="PlayerExternal";
    Position: [x: number, y: number] = [300,300];

    constructor(
        
    ) {
        super();
    }

    draw() {
        this.game.context.fillStyle = "#BB2200";
        this.game.context.fillRect(
            this.Position[0]+0,
            this.Position[1]+0,
            50,
            50);
    }
}

class PlayerExternalCollection {
    public players: PlayerExternal[] = [];

    public join(player:PlayerExternal) {
        this.players.push(player);
    }
}

export let PlayerCollection = new PlayerExternalCollection();