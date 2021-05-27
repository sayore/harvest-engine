import { Socket } from "socket.io";
import { PacketRegistry } from "../packets/packet_registry";
import { RegisterPacket } from "../packets/00_register";
import { ChatPacket } from "../packets/01_chat";
import { RefreshPacket } from "../packets/03_refresh";
import { memoryStorage } from "./redis";
import { ResetPacket } from "../packets/06_reset";

export class Player {
    public packageRegistry: PacketRegistry;
    public extra: any = {
        name:["Alp","Bet","Gam","Ome","San"][Math.floor(Math.random()*5)]
        +["Alp","Bet","Gam","Ome","San"][Math.floor(Math.random()*5)]
        +["Alp","Bet","Gam","Ome","San"][Math.floor(Math.random()*5)]
    };

    constructor(
        public socket: Socket
    ) {
        this.packageRegistry = new PacketRegistry();
        this.packageRegistry.socket = socket;
        this.packageRegistry.player = this;
        this.packageRegistry.register("00", new RegisterPacket());
        this.packageRegistry.register("01", new ChatPacket());
        this.packageRegistry.register("03", new RefreshPacket());
        this.packageRegistry.register("06", new ResetPacket());
        this.packageRegistry.packetsRegistred.forEach(packet => {
            socket.on(packet[0], (args) => {packet[1].handle(args, socket);});
        });
    }
}
