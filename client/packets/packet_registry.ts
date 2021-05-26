import { Socket } from "socket.io-client";
import { StrictEventEmitter } from "socket.io-client/build/typed-events";
import { player } from "..";
import { Player } from "../player";
import { BasePacket } from "./base";

export class PacketRegistry {
    public packetsRegistred : [name:string, packet:BasePacket][] = [];
    socket: Socket;
    public player: Player;

    public register(name: string,packet : BasePacket) {
        console.log("Registred ",name," Packet", packet)
        packet.player = this.player;

        if(!this.player) { console.log("Player ist im packet registry nicht definiert. Dieses Object ist eine Kollektion des Player structs. Bitte stattdessen ein Player Object erstellen."); }
        this.packetsRegistred.push([name, packet]);
    }
}