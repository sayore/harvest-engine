import { IChunk } from "../interface/IChunk";
import { Vector } from "./Vector";

export class Chunk implements IChunk{
    globalPosition: Vector;
    chunkSize: number;
    tileset:number;
    data:undefined | string;
    serialize(version:number=1) : string {
        return Chunk.serialize(this,version);
    };
    
    deserialize(data:string) : void {
        // v
        // 1??????????????????????????????????????????????????????????...
        switch(data[0]) {
            case '1':
                let offset=1;
                //  aaaaaaaabbbbbbbb
                // 1       1       013012301234567456789AB89ABCDEFCDEF012301234567456789AB89ABCDEFCDEF
                this.globalPosition = new Vector(Number(data.slice(offset,offset+8)),Number(data.slice(offset+8,offset+16)));
                offset+=16
                //                  v
                // 1       1       013012301234567456789AB89ABCDEFCDEF012301234567456789AB89ABCDEFCDEF
                this.tileset = Number(data.slice(offset,offset+1));
                offset+=1
                //                   v
                // 1       1       013012301234567456789AB89ABCDEFCDEF012301234567456789AB89ABCDEFCDEF
                this.chunkSize = Math.pow(4,Number(data.slice(offset,offset+1)));
                offset+=1
                //                    vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                // 1       1       013012301234567456789AB89ABCDEFCDEF012301234567456789AB89ABCDEFCDEF
                this.data = data.slice(offset,offset+this.chunkSize);
                console.log(offset,offset+this.chunkSize)
        }
    };

    static serialize(chunk:Chunk, version:number=1) : string {
        //var bufArr = new ArrayBuffer(4+chunk.chunkSize*3);
        //var bufView = new Int8Array(bufArr);
        return "2"
                +chunk.globalPosition.x.toString().padStart(8," ")
                +chunk.globalPosition.y.toString().padStart(8," ")
                +chunk.tileset
                +chunk.chunkSize
                +chunk.data;
    };
    static deserialize(data:string): Chunk {
        let retChunk = new Chunk();

        retChunk.deserialize(data);
        console.log(data)
        
        return retChunk;
    };
}
