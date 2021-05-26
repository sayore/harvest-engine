import { Socket } from "socket.io-client";
import { eHTTPServer } from "../lib/httpserver";
import { Player } from "../lib/player";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class RefreshPacket extends BasePacket{
    public player: Player;
    handle(args:{msg:string}) {
        memoryStorage.lrange("chat",-100,100,(err,res)=>{
            this.player.socket.emit("01",res);
        })
        
    }
    send(socket: Socket,message:string) {

    }
}