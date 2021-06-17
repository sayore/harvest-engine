import { Graphics, TilingSprite } from "pixi.js";
import { Socket } from "socket.io-client";
import { game } from "..";
import { Chunk } from "../../lib/types/Chunk";
import { ChunkHandler } from "../game/entities/chunkHandler";
import { BasePacket } from "./base";

export class ConsolePaket extends BasePacket{
    handle(data:string) {
        console.log(data);

    }
    send(socket: Socket,message:string) {

    }
}