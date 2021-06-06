import { BasePacket } from "./base";

export class RegisterPacket extends BasePacket {
    public handle(args:any){
        // Received a registration request
        console.log("Working Packet 00: "+ JSON.stringify(args));

        //console.log(this);

        if(!!args.uni) {
            this.game.entities.find(m=>m.Type=="Player").uuid= args.uuid;
            console.log("Players uuid has been set to: "+args.uuid);
            localStorage.setItem('uuid',args.uni);
        }
    }
}


