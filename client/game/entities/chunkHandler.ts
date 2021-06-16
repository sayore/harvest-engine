import { Graphics, ObservablePoint, RenderTexture, Sprite, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { ChunkRequest } from "../../../lib/packets/ChunkRequest";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";
import { VisibleChunk } from "./map/visibleChunk";
import { Player } from "./player";


export class ChunkHandler extends ClientEntity implements IDrawable {
    Type="ChunkHandler";
    MyGraphics: Graphics;
    fpsCounter: Text;
    drawnChunks: Map<string, VisibleChunk>;
    player: Player;
    emptyChunkTexture: RenderTexture;
    loadedChunks: Map<string, VisibleChunk>;
    Position: Vector;

    initialize() {
        this.player = this.game.getEntity<Player>("Player");
        this.MyGraphics = new Graphics();

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                var ts = new TilingSprite(this.game.loader.resources["rpgtileset"].texture, 64, 64);
                ts.tilePosition.x = -64;
                ts.tilePosition.y = -64;
                ts.y = 64 * i;
                ts.x = 64 * j;
                this.MyGraphics.addChild(ts);
            }
        }

        this.emptyChunkTexture = this.game.renderer.generateTexture(this.MyGraphics)
        //var drawnEmptyChunk = new Sprite(this.emptyChunkTexture);


        //this.game.stage.addChild(drawnEmptyChunk);
        this.visibleChunkCheck()
    }

    chunkCheckTicker = 0;
    update()
    {
        this.chunkCheckTicker++;
        if(this.chunkCheckTicker%60 == 0) {
            this.visibleChunkCheck()
        }
    }

    getChunkId(v: Vector): string {
        return "1x" + v.x + "y" + v.y
    }
    private getChunkPosFromIdMode = 0;
    getChunkPosFromId(id: string): Vector {
        this.getChunkPosFromIdMode = 0;
        let xpos = "";
        let ypos = "";
        for (let i = 0; i < id.length; i++) {
            const character = id[i];

            switch (this.getChunkPosFromIdMode) {
                case 0:
                    //First character returns Version of the Chunk ID's
                    if (character == '1') this.getChunkPosFromIdMode = 100;
                    break;
                case 100:
                    // V1 Get x
                    if (this.getChunkPosFromIdMode == 100 && "1234567890.-".indexOf(character) !== -1) { xpos += character; }
                    else {
                        if (character != 'y') {
                            console.error("Error Parsing Chunk Position, y didn't follow after x position."); return;
                        } else {
                            this.getChunkPosFromIdMode = 101
                        }
                    }
                    break;
                case 101:
                    // V1 Get y
                    if ("1234567890.-".indexOf(character) !== -1) { ypos += character; } else { console.error("After the y coordinate there was too much data."); return; }
                    break;
            }
        }
        return new Vector(Number(xpos), Number(ypos));
    }

    addChunk(pos:Vector) {
        //console.log("Loaded chunk "+pos.x+" "+pos.y)
        
        // Get Chunk from Server - - -
        var drawnEmptyChunk = new Sprite(this.emptyChunkTexture);

        this.loadedChunkTextures.set(this.getChunkId(pos),drawnEmptyChunk);
        this.game.socket.emit("09",new ChunkRequest(pos));

        var posToDraw = Vector.mul(pos,this.game.coreChunkSizeInPixels);
        drawnEmptyChunk.setTransform(posToDraw.x,posToDraw.y);
        this.game.map.addChild(drawnEmptyChunk);
        this.lastChunkPositive.push([this.getChunkId(pos),drawnEmptyChunk,pos]);
    }
    removeChunk(chunk:[string, Sprite, Vector]) {
        //console.log("Remove "+chunk[0]);
        this.game.map.removeChild(chunk[1]);
        this.lastChunkPositive = this.lastChunkPositive.filter(lcp => lcp[0]!=chunk[0]);
    }
    loadChunkFromServer() {

    }
    
    loadedChunkTextures:Map<string, Sprite> = new Map();
    lastChunkPositive:[string, Sprite, Vector][] = [];
    visibleChunkCheck() {
        var topLeft = this.player.Position.clone().subNumber(1000).div(this.game.coreChunkSizeInPixels).floor();
        var bottomRight = this.player.Position.clone().addNumber(1000).div(this.game.coreChunkSizeInPixels).ceil();
        var foundIds:Set<string> = new Set();

        for (let i = topLeft.x; i < bottomRight.x; i++) {
            for (let j = topLeft.y; j < bottomRight.y; j++) {
                if(this.lastChunkPositive.findIndex(function(chunk){return (chunk[2].x==i && chunk[2].y==j)}) == -1) {
                    this.addChunk(new Vector(i,j));
                }
                foundIds.add(this.getChunkId(new Vector(i,j)))
            }
        }

        this.removeChunkWhichAreOutOfVisRange(foundIds);
        this.removeChunkWhichAreOutOfVisRange(foundIds);

        if(this.lastChunkPositive.length>=25) {
            this.removeChunkWhichAreOutOfVisRange(foundIds);
        }
        if(this.lastChunkPositive.length>=50) {
            this.removeChunkWhichAreOutOfVisRange(foundIds);
            this.removeChunkWhichAreOutOfVisRange(foundIds);
        }
        if(this.lastChunkPositive.length>=100) {
            this.removeChunkWhichAreOutOfVisRange(foundIds);
            this.removeChunkWhichAreOutOfVisRange(foundIds);
        }
        if(this.lastChunkPositive.length>=200) {
            this.removeChunkWhichAreOutOfVisRange(foundIds);
            this.removeChunkWhichAreOutOfVisRange(foundIds);
            this.removeChunkWhichAreOutOfVisRange(foundIds);
            this.removeChunkWhichAreOutOfVisRange(foundIds);
        }
        console.log("Visible&Loaded Chunks: "+this.lastChunkPositive.length);
    }

    removeChunkWhichAreOutOfVisRange(visibleIds: Set<string>) {
        var checkId = Math.floor(Math.random()*this.lastChunkPositive.length);
        if(!visibleIds.has(this.lastChunkPositive[checkId][0])) {
            this.removeChunk(this.lastChunkPositive[checkId]);
            //console.log(checkId,visibleIds);
        }
    }
}