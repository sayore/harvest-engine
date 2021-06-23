import { Socket } from "socket.io-client";
import { BasePacket } from "./base";

export class ConsolePaket extends BasePacket{
    handle(data:string) {
        console.log(data);

    }
    send(socket: Socket,message:string) {

    }
}