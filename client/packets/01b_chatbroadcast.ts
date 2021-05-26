import { Socket } from "socket.io-client";
import { player } from "..";
import { BasePacket } from "./base";

export class ChatBroadcastPacket extends BasePacket{
    handle(args:{msg:string}) {
        document.querySelector('#chat').innerHTML+=player.UniqueIdentifier+": "+ args.msg+"<br>";
    }
    send(socket: Socket,message:string) {

    }
}