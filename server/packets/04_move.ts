import { Socket } from "socket.io-client";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class MovePacket extends BasePacket{
    handle(args:{msg:string}) {
        memoryStorage.lrange("chat",-100,100,(err,res)=>{
            this.player.socket.emit("01",res);
        })
        
    }
    send(socket: Socket,message:string) {

    }
}