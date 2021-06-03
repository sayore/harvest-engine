import { Socket } from "socket.io-client";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class ChatPacket extends BasePacket{
    handle(args:{msg:string}) {
        args.msg = args.msg.slice(0,256)
        memoryStorage.lpush("chat",this.player.extra.name+": "+args.msg);
        memoryStorage.ltrim("chat",0,20);
        memoryStorage.expire('chat',360);
        console.log({msg:this.player.extra.name+": "+args.msg});
        eHTTPServer.io.emit('01b',{msg:this.player.extra.name+": "+args.msg})

    }
    send(socket: Socket,message:string) {

    }
}