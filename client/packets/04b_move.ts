import { Socket } from "socket.io-client";
import { PlayerPosition } from "../../lib/packets/PlayerPositionUpdate";
import { BasePacket } from "./base";

export class MovePacket extends BasePacket{
    // Will be received on every message send into chat!
    handle(args:{playerpositions:PlayerPosition[]}) {
        
    }
    send(socket: Socket,message:string) {

    }
}