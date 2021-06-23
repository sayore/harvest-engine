import { Graphics, TilingSprite } from "pixi.js";
import { Socket } from "socket.io-client";
import { game } from "..";
import { Chunk } from "../../lib/types/Chunk";
import { ChunkHandler } from "../game/entities/ChunkHandler";
import { BasePacket } from "./base";

export class ChunkCallBackPaket extends BasePacket{
    handle(chunkStr:string) {
        if(chunkStr==null) return;
        let chunk=Chunk.deserialize(chunkStr);

        let MyGraphics = new Graphics();
        for (let i = 0; i < chunk.data.length; i++) {
            var ts = new TilingSprite(this.game.Loader.resources["rpgtileset"].texture, 64, 64);
            ts.tilePosition.x = chunk.data[i].TileInTileset.x*-64;
            ts.tilePosition.y = chunk.data[i].TileInTileset.y*-64;
            ts.x = (i%8)*64;
            ts.y = Math.floor(i/8)*64;
            MyGraphics.addChild(ts);
        }
        //console.log(game);
        let renderedChunk = game.renderer.generateTexture(MyGraphics)

        let chunkHandler = game.getEntity<ChunkHandler>("ChunkHandler");
        chunkHandler.removeChunkViaId( chunkHandler.getChunkId(chunk.globalPosition) );
        console.log("Removed "+chunkHandler.getChunkId(chunk.globalPosition))
        chunkHandler.addChunk( chunk.globalPosition, renderedChunk );
    }
    send(socket: Socket,message:string) {

    }
}