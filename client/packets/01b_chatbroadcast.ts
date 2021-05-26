import { Socket } from "socket.io-client";
import { BasePacket } from "./base";

export class ChatBroadcastPacket extends BasePacket{
    // Will be received on every message send into chat!
    handle(args:{msg:string}) {
        (<HTMLDivElement>document.querySelector('#chat')).innerText+=`${args.msg}\n`; //???
    }
    send(socket: Socket,message:string) {

    }
}