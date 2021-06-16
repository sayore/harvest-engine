import { Vector } from "../../lib/types/Vector";

export class Tileset {
    constructor(
        public Path:string,
        public TileSize:Vector
    ) {}
    load() {
        
    };
}

export let TilsetsDB = [
    new Tileset("sprite/RPGpack_sheet.png",new Vector(64,64))


] 