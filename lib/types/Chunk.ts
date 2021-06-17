import { IChunk } from "../interface/IChunk";
import { Vector } from "./Vector";

export class Chunk implements IChunk{
    globalPosition: Vector;
    chunkSize: number;
    tileset:number;
    data:Tile[];

    constructor() {
        this.chunkSize=8*8;
        this.data = new Array(this.chunkSize);
        for (let i = 0; i < this.data.length; i++) {
            this.data[i]  = new Tile();
        }
    }

    serialize(version:number=1) : string {
        return Chunk.serialize(this,version);
    };

    static serialize(chunk:Chunk, version:number=1) : string {
        //var bufArr = new ArrayBuffer(4+chunk.chunkSize*3);
        //var bufView = new Int8Array(bufArr);
        return JSON.stringify(chunk);
    };
    static deserialize(data:string): Chunk {


        return <Chunk>JSON.parse(data);;
    };
}

export class Tile {
    TileInTileset = new Vector(0,0);
}