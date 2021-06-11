import { Socket } from "socket.io-client";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class ResetPacket extends BasePacket{
    handle(args:{}) {
        this.player.socket.emit("08",this.player.uuid)
        console.log("Player rerequested UUID "+this.player.uuid);
    }
    send(socket: Socket,message:string) {

    }
}