import { Socket } from "socket.io-client";
import { BasePacket } from "./base";

export class PlayerExternalJoinPacket extends BasePacket {
    constructor() {
        super();
        console.log("constructed chat packet");
    }
    handle(args:object | Array<string>) {
        if(Array.isArray(args)) {
            args.forEach((str)=>{
                document.querySelector('#chat').innerHTML+="???: "+ str+"<br>";
            })
        }
        console.log(args);
    }
    send(socket: Socket,message:string) {

    }
}