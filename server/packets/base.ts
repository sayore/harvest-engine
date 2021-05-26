import { Socket } from "socket.io/dist/socket";
import { Player } from "../lib/player";

export class BasePacket {
    public player: Player;
    handle(obj:any, socket: Socket | undefined) {

    }
    setPlayer(player: Player) {
        this.player = player;
    }
}