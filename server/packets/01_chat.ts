import { Socket } from "socket.io-client";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class ChatPacket extends BasePacket{
    handle(args:{msg:string}) {
        memoryStorage.rpush("chat",args.msg);
        eHTTPServer.io.emit('01b',{msg:args.msg})

    }
    send(socket: Socket,message:string) {

    }
}