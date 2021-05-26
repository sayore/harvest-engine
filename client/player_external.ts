import { Socket } from "socket.io-client";
import { RegisterPacket } from "./packets/00_register";
import { ChatBroadcastPacket } from "./packets/01b_chatbroadcast";
import { ChatPacket } from "./packets/01_chat";
import { PacketRegistry } from "./packets/packet_registry";

export class PlayerExternal {
    UniqueIdentifier: any;
    
    constructor(
        
    ) {
        
    }
}

class PlayerExternalCollection {
    public players: PlayerExternal[] = [];

    public join(player:PlayerExternal) {
        this.players.push(player);
    }
}

export let PlayerCollection = new PlayerExternalCollection();