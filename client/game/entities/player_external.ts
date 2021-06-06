import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/vector";
import { Entity } from "../entity";

export class PlayerExternal extends Entity implements IDrawable{
    UniqueIdentifier: any;
    
    Type="PlayerExternal";

    constructor(
        
    ) {
        super();

        setInterval(()=>{
            this.game.socket.emit("07",()=>{
                
            })
        },500)
    }
    Position: Vector;

    draw() {
        this.game.context.fillStyle = "#BB2200";
        this.game.context.fillRect(
            this.Position.x,
            this.Position.y,
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