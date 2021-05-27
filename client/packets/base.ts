import { Socket } from "socket.io-client";
import { Player } from "../game/entities/player";

export class BasePacket {
    public socket : Socket;
    public player: Player;
    handle(obj:any) {

    }
}