import { Socket } from "socket.io-client";
import { BasePacket } from "./base";

export class ChatPacket extends BasePacket{
    handle(args:object) {
        
    }
    send(socket: Socket,message:string) {

    }
}