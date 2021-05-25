import { BasePacket } from "./base";

export class RegisterPacket extends BasePacket {
    public handle(args:object){
        console.log("Working Packet 00: "+ JSON.stringify(args));
    }
}