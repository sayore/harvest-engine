
import { Socket } from "socket.io";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class RefreshPacket extends BasePacket{
    handle(args:{msg:string}) {
        memoryStorage.lrange("chat",0,20,(err,res)=>{
            this.player.socket.emit("01",res);
        })
        
    }
    send(socket: Socket,message:string) {

    }
} 