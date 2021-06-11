import { Socket } from "socket.io-client";
import { Player } from "../game/entities/player";
import { ClientGame } from "../game/ClientGame";

export class BasePacket {
    public socket : Socket;
    public game: ClientGame;
    
    handle(obj:any) {

    }
}