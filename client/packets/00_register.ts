import { BasePacket } from "./base";

export class RegisterPacket extends BasePacket {
    public handle(args:any){
        // Received a registration request
        console.log("Working Packet 00: "+ JSON.stringify(args));

        console.log(this);

        if(!!args.uni) {

            this.game.UniqueIdentifier = args.uni;
        }
    }
}


