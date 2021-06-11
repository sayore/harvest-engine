import { IChunk } from "../../../../lib/interface/IChunk";
import { Vector } from "../../../../lib/types/Vector";
import { ClientEntity } from "../../ClientEntity";

export class VisibleChunk extends ClientEntity implements IChunk  {
    
    chunkSize: number;
    globalPosition: Vector;
    tiles: Vector; 
    Position: Vector;
    StaticEntities:ClientEntity[];
    load() {
        this.game.socket.emit("07",{X:this.Position.x,Y:this.Position.y})
    }
}
