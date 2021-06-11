import { Socket } from "socket.io-client";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class MovePacket extends BasePacket{
    handle(args:{msg:string}) {
        this.player.game.entities.

        eHTTPServer.io.emit('04b',)
        
    }
    send(socket: Socket,message:string) {

    }
}