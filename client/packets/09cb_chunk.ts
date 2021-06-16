import { Graphics, TilingSprite } from "pixi.js";
import { Socket } from "socket.io-client";
import { game } from "..";
import { Chunk } from "../../lib/types/Chunk";
import { ChunkHandler } from "../game/entities/chunkHandler";
import { BasePacket } from "./base";

export class ChunkCallBackPaket extends BasePacket{
    handle(chunk:string) {
        console.log(Chunk.deserialize(chunk));

        let MyGraphics = new Graphics();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                var ts = new TilingSprite(this.game.loader.resources["rpgtileset"].texture, 64, 64);
                ts.tilePosition.x = -64;
                ts.tilePosition.y = -64;
                ts.y = 64 * i;
                ts.x = 64 * j;
                MyGraphics.addChild(ts);
            }
        }
        //console.log(game);
        let renderedChunk = game.renderer.generateTexture(MyGraphics)

        let chunkHandler = game.getEntity<ChunkHandler>("ChunkHandler");
    }
    send(socket: Socket,message:string) {

    }
}