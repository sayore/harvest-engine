import { IChunk } from "../../../../lib/interface/IChunk";
import { Vector } from "../../../../lib/types/vector";
import { Entity } from "../../entity";

export class VisibleChunk extends Entity implements IChunk  {
    constructor(
        public Position: [x: number, y: number] = [0,0]
    ) {
        super();
    }
    globalPosition: Vector;
    tiles: Vector;
    load() {
        this.game.socket.emit("07",{X:this.Position[0],Y:this.Position[1]})
    }
}
