import { player } from "..";
import { BasePacket } from "./base";

export class RegisterPacket extends BasePacket {
    public handle(args:any){
        // Received a registration request
        console.log("Working Packet 00: "+ JSON.stringify(args));

        console.log(this);

        if(!!args.uni) {

            player.UniqueIdentifier = args.uni;
        }
    }
}


