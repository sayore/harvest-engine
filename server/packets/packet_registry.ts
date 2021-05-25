import { StrictEventEmitter } from "socket.io-client/build/typed-events";
import { Socket } from "socket.io/dist/socket";
import { BasePacket } from "./base";

export class PacketRegistry {
    public packetsRegistred : [name:string, packet:BasePacket][] = [];
    public register(name: string,packet : BasePacket) {
        this.packetsRegistred.push([name, packet]);
    }
}