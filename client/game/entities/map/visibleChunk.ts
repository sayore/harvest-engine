import { IChunk } from "../../../../lib/interface/IChunk";
import { Vector } from "../../../../lib/types/vector";
import { Entity } from "../../entity";

export class VisibleChunk extends Entity implements IChunk  {
    
    chunkSize: number;
    globalPosition: Vector;
    tiles: Vector; 
    Position: Vector;
    StaticEntities:Entity[];
    load() {
        this.game.socket.emit("07",{X:this.Position.x,Y:this.Position.y})
    }
}
