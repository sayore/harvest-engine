import { Socket } from "socket.io-client";
import { ChunkRequest } from "../../lib/packets/ChunkRequest";
import { TileUpdateRequest } from "../../lib/packets/TileUpdateRequest";
import { Chunk } from "../../lib/types/Chunk";
import { permanentDatabase } from "../lib/database";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class TileUpdatePacket extends BasePacket{
    handle(tileUpdateRequest:TileUpdateRequest) {
        // Check for permission

        // Change Tile in DB

        // - - Load chunk

        // - - Change Chunk

        // - - Put Chunk back into DB

        // Send change to players that are in the area.
        

        //this.player.socket.emit("11b",data) 
    }
    send(socket: Socket,message:string) {

    }
} 