import { Socket } from "socket.io";
import { PacketRegistry } from "../../packets/packet_registry";
import { Entity } from "../entity";

export class Player extends Entity{
    public packageRegistry: PacketRegistry;
    public extra: any = {
        name:["Alp","Bet","Gam","Ome","San"][Math.floor(Math.random()*5)]
        +["Alp","Bet","Gam","Ome","San"][Math.floor(Math.random()*5)]
        +["Alp","Bet","Gam","Ome","San"][Math.floor(Math.random()*5)]
    };

    constructor(
        public uuid: string,
        public socket: Socket
    ) {
        super();
        this.uuid = uuid;
        this.packageRegistry = new PacketRegistry();
        this.packageRegistry.socket = socket;
        this.packageRegistry.player = this;
        //this.packageRegistry.register("00", new RegisterPacket());
        //this.packageRegistry.register("01", new ChatPacket());
        //this.packageRegistry.register("03", new RefreshPacket());
        //this.packageRegistry.register("06", new ResetPacket());
        this.packageRegistry.packetsRegistred.forEach(packet => {
            socket.on(packet[0], (args) => {packet[1].handle(args, socket);});
        });
    }


}
