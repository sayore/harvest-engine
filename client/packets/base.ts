import { Socket } from "socket.io-client";
import { Player } from "../player";

export class BasePacket {
    public socket : Socket;
    public player: Player;
    handle(obj:any) {

    }
}