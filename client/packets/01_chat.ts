import { Socket } from "socket.io-client";
import { BasePacket } from "./base";

export class ChatPacket extends BasePacket {
    constructor() {
        super();
        console.log("constructed chat packet");
    }
    // Loading Chat messages, this will be received if the client sends a 05.
    handle(args:object | Array<string>) {
        if(Array.isArray(args)) {
            args.forEach((str)=>{
                (<HTMLDivElement>document.querySelector('#chat')).innerText+=`${str}\n`;
            })
        }
        console.log(args);
    }
    send(socket: Socket,message:string) {

    }
}