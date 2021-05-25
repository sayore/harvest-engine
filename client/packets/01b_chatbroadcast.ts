import { Socket } from "socket.io-client";
import { BasePacket } from "./base";

export class ChatBroadcastPacket extends BasePacket{
    handle(args:{msg:string}) {
        document.querySelector('#chat').innerHTML+=args.msg+"<br>";
    }
    send(socket: Socket,message:string) {

    }
}