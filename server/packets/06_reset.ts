import { Socket } from "socket.io-client";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class ResetPacket extends BasePacket{
    handle(args:{}) {
        memoryStorage.del("chat");
        eHTTPServer.io.emit('06b')
        
    }
    send(socket: Socket,message:string) {

    }
}