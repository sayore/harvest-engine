import { Socket } from "socket.io-client";
import { PlayerPosition } from "../../lib/packets/PlayerPositionUpdate";
import { eHTTPServer } from "../lib/httpserver";
import { memoryStorage } from "../lib/redis";
import { BasePacket } from "./base";

export class MovePacket extends BasePacket{
    static playerPositions:Array<PlayerPosition> = [];
    handle(args:PlayerPosition) {
        //this.player.game.entities.
        var found = MovePacket.playerPositions.find((pp)=>{return (pp.UUID==args.UUID && pp.UUID!=undefined)})
        
        if(found)
        {found.Position = args.Position;}
        else
        {MovePacket.playerPositions.push(args);}

        eHTTPServer.io.emit('04b',MovePacket.playerPositions);
        
    }
    send(socket: Socket,message:string) {

    }
}