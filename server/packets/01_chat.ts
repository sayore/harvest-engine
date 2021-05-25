import { Socket } from "socket.io-client";
import { eHTTPServer } from "../lib/httpserver";
import { BasePacket } from "./base";

export class ChatPacket extends BasePacket{
    handle(args:object) {
        eHTTPServer.io.emit('01b',args)
    }
    send(socket: Socket,message:string) {

    }
}