import { Socket } from "socket.io-client";
import { Chat } from "../wrappers/chat";
import { BasePacket } from "./base";

export class ChatBroadcastPacket extends BasePacket{
    // Will be received on every message send into chat!
    handle(args:{msg:string}) {
        console.log("01b:",args.msg);
        Chat.addmessage(args.msg);
    }
    send(socket: Socket,message:string) {

    }
}