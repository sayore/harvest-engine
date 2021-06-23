import { Socket } from "socket.io-client";
import { PlayerPosition } from "../../lib/packets/PlayerPositionUpdate";
import { Vector } from "../../lib/types/Vector";
import { PlayerExternal } from "../game/entities/PlayerExternal";
import { BasePacket } from "./base";

export class MovePacket extends BasePacket{
    // Will be received on every message send into chat!
    handle(playerpositions:PlayerPosition[]) {
        playerpositions.forEach((pp:PlayerPosition)=>{
            if(pp.UUID == localStorage.getItem("uuid")) return;
            let entity = <PlayerExternal>this.game.Entities.find(ent=>{return (ent.UUID==pp.UUID && ent.Type=="PlayerExternal")});
            
            //console.log(entity);
            
            if(entity) {
                //console.log("Entity Exists! ", entity)
                entity.targetPosition.x=pp.Position.x
                entity.targetPosition.y=pp.Position.y;
            } else {
                console.log("Entity does not Exists! ", entity , pp)
                this.game.add(new PlayerExternal(pp.UUID))
            }
        })
    }
    send(socket: Socket,message:string) {

    }
}