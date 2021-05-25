import { Socket } from "socket.io-client";
import { StrictEventEmitter } from "socket.io-client/build/typed-events";
import { BasePacket } from "./base";

export class PacketRegistry {
    public packetsRegistred : [name:string, packet:BasePacket][] = [];
    public register(name: string,packet : BasePacket, socket:Socket) {
        packet.socket = socket;
        this.packetsRegistred.push([name, packet]);
    }
}