import { Vector } from "../types/Vector";

export class PlayerPositions {
    Type="PlayerPositions";
    public players: Map<string,PlayerPosition>

}

export class PlayerPosition {
    Type="PlayerPosition";
    constructor(
        public UUID:string=undefined,
        public Position: Vector) {

    }
}
