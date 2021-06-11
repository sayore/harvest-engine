import { Socket } from "socket.io-client";
import { PlayerPosition } from "../../lib/packets/PlayerPositionUpdate";
import { Vector } from "../../lib/types/Vector";
import { PlayerExternal } from "../game/entities/player_external";
import { BasePacket } from "./base";

export class MovePacket extends BasePacket{
    // Will be received on every message send into chat!
    handle(playerpositions:PlayerPosition[]) {
        playerpositions.forEach((pp:any)=>{
            let entity = <PlayerExternal>this.game.entities.find(ent=>{return (ent.uuid==pp.UUID && ent.Type=="PlayerExternal")});
            //console.log(entity);
            
            if(entity) {
                //console.log("Entity Exists! ", entity)
                entity.Position.x=pp.Position.x
                entity.Position.y=pp.Position.y;
            } else {
                console.log("Entity does not Exists! ", entity , pp)
                this.game.add(new PlayerExternal(pp.UUID))
            }
        })
    }
    send(socket: Socket,message:string) {

    }
}