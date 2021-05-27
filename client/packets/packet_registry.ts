import { Socket } from "socket.io-client";
import { Game } from "../game/game";
import { BasePacket } from "./base";

export class PacketRegistry {
    public packetsRegistred : [name:string, packet:BasePacket][] = [];
    socket: Socket;
    public game: Game;

    public register(name: string,packet : BasePacket) {
        console.log("Registred ",name," Packet", packet)
        packet.game = this.game;

        if(!this.game) { console.log("Game ist im packet registry nicht definiert. Dieses Object ist eine Kollektion des Player structs. Bitte stattdessen ein Player Object erstellen."); }
        this.packetsRegistred.push([name, packet]);
    }
}