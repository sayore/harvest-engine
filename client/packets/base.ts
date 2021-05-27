import { Socket } from "socket.io-client";
import { Player } from "../game/entities/player";
import { Game } from "../game/game";

export class BasePacket {
    public socket : Socket;
    public game: Game;
    handle(obj:any) {

    }
}