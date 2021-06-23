import { Socket } from "socket.io-client";
import { ChunkRequest } from "../../lib/packets/ChunkRequest";
import { Chunk } from "../../lib/types/Chunk";
import { permanentDatabase } from "../lib/database";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class ChunkPacket extends BasePacket{
    handle(chunkRequest:ChunkRequest) {
        //var retChunk = new Chunk()
        //retChunk.globalPosition=chunkRequest.ChunkPosition;
        //retChunk.tileset=1;
        //retChunk.chunkSize=3;

        var data = permanentDatabase.prepare("SELECT data FROM chunks WHERE x = ? AND y = ?")
            .get([chunkRequest.ChunkPosition.x,
                    chunkRequest.ChunkPosition.y
            ]);
        

        this.player.socket.emit("09cb",data) 
        
        ////permanentDatabase.prepare("SELECT * FROM chunks WHERE ")
        //this.player.socket.emit("10",retChunk.serialize())
        //console.log("Player rerequested Chunk "+ JSON.stringify(chunkRequest.ChunkPosition));
    }
    send(socket: Socket,message:string) {

    }
} 