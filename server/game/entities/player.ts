import { Socket } from "socket.io";
import { RegisterPacket } from "../../packets/00_register";
import { MovePacket } from "../../packets/04_move";
import { PacketRegistry } from "../../packets/packet_registry";
import { Entity } from "../entity";

export class Player extends Entity{
    public packageRegistry: PacketRegistry;
    public Position: [x: number, y: number] = [0, 0];
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
        //console.log("Player joined")
        socket.emit("08",uuid);
        this.uuid = uuid;
        this.packageRegistry = new PacketRegistry();
        this.packageRegistry.socket = socket;
        this.packageRegistry.player = this;
        this.packageRegistry.register("00", new RegisterPacket());
        //this.packageRegistry.register("01", new ChatPacket());
        //this.packageRegistry.register("03", new RefreshPacket());
        //this.packageRegistry.register("06", new ResetPacket());
        this.packageRegistry.register("04", new MovePacket());
        this.packageRegistry.packetsRegistred.forEach(packet => {
            socket.on(packet[0], (args) => {/*console.log("Received "+packet[0]);*/ packet[1].handle(args, socket);});
        });
    }


}
