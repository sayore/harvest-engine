import { StrictEventEmitter } from "socket.io-client/build/typed-events";
import { Socket } from "socket.io/dist/socket";
import { Player } from "../game/entities/player";
import { BasePacket } from "./base";

export class PacketRegistry {
    public packetsRegistred : [name:string, packet:BasePacket][] = [];
    public socket : Socket;
    public player: Player;

    public register(name: string, packet : BasePacket) {
        console.log("Registred ",name," Packet", packet.constructor.name)
        packet.setPlayer(this.player); 
        //console.log(packet);
        this.packetsRegistred.push([name, packet]);
    }
}