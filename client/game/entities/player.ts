import { Socket } from "socket.io-client";
import { RegisterPacket } from "../../packets/00_register";
import { ChatResetPacket } from "../../packets/06b_reset";
import { ChatPacket } from "../../packets/01_chat";
import { PacketRegistry } from "../../packets/packet_registry";
import { ChatBroadcastPacket } from "../../packets/01b_chatbroadcast copy";

export class Player {
    private packageRegistry: PacketRegistry;
    UniqueIdentifier: any;
    

    constructor(
        public socket: Socket
    ) {
        this.packageRegistry = new PacketRegistry();
        this.packageRegistry.game = this;
        this.packageRegistry.socket = socket;
        this.packageRegistry.register("00",new RegisterPacket());
        this.packageRegistry.register("01",new ChatPacket());
        this.packageRegistry.register("01b",new ChatBroadcastPacket());
        this.packageRegistry.register("06b",new ChatResetPacket());
        
        this.packageRegistry.packetsRegistred.forEach(packet => {
            socket.on(packet[0],packet[1].handle)
        });
        setTimeout(()=>{socket.emit("03");},1000)
    }

    update() {
        
    }
}