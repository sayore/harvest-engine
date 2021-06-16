import { Socket } from "socket.io-client";
import { ChunkRequest } from "../../lib/packets/ChunkRequest";
import { Chunk } from "../../lib/types/Chunk";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class ChunkPacket extends BasePacket{
    handle(chunkRequest:ChunkRequest) {
        var retChunk = new Chunk()
        retChunk.globalPosition=chunkRequest.ChunkPosition;
        retChunk.tileset=1;
        retChunk.chunkSize=3;
        retChunk.data=
         "01230123"
        +"45674567"
        +"89AB89AB"
        +"CDEFCDEF"
        +"01230123"
        +"45674567"
        +"89AB89AB"
        +"CDEFCDEF"
        this.player.socket.emit("09cb",retChunk.serialize())
        console.log("Player rerequested Chunk "+ JSON.stringify(chunkRequest.ChunkPosition));
    }
    send(socket: Socket,message:string) {

    }
} 