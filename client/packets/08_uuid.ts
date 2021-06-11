import { Socket } from "socket.io-client";
import { Chat } from "../wrappers/chat";
import { BasePacket } from "./base";

export class UUIDPacket extends BasePacket{
    handle(uuid:string) {
        //this.game.UniqueIdentifier=uuid;
        localStorage.setItem('uuid',uuid);
    }
    send(socket: Socket,message:string) {

    }
}