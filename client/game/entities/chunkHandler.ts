import { Graphics, ObservablePoint, RenderTexture, Sprite, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";
import { VisibleChunk } from "./map/visibleChunk";
import { Player } from "./player";


export class ChunkHandler extends ClientEntity implements IDrawable {
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
                    if (this.getChunkPosFromIdMode == 100 && "1234567890.".indexOf(character) !== -1) { xpos += character; }
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
                    if ("1234567890.".indexOf(character) !== -1) { ypos += character; } else { console.error("After the y coordinate there was too much data."); return; }
                    break;
            }
        }
        return new Vector(Number(xpos), Number(ypos));
    }

    addChunk(pos:{x:number,y:number}) {
        console.log("Loaded chunk "+pos.x+" "+pos.y)
        var drawnEmptyChunk = new Sprite(this.emptyChunkTexture);
        drawnEmptyChunk.setTransform(pos.x*this.game.coreChunkSizeInPixels.x,pos.y*this.game.coreChunkSizeInPixels.y);
        this.game.map.addChild(drawnEmptyChunk);
        this.lastChunkPositive.push({x:pos.x,y:pos.y});
    }

    lastChunkPositive:object[] = [];
    visibleChunkCheck() {
        var topLeft = this.player.Position.clone().subNumber(1000).div(this.game.coreChunkSizeInPixels).floor();
        var bottomRight = this.player.Position.clone().addNumber(1000).div(this.game.coreChunkSizeInPixels).ceil();
        
        console.log(topLeft);
        console.log(bottomRight);
        //var chunkPositive = [];

        for (let i = topLeft.x; i < bottomRight.x; i++) {
            for (let j = topLeft.y; j < bottomRight.y; j++) {
                //console.log(this.lastChunkPositive.findIndex((pos:{x:number,y:number})=>{return (pos.x==i && pos.y==j)}));
                if(this.lastChunkPositive.findIndex(function(pos:{x:number,y:number}){return (pos.x==i && pos.y==j)}) == -1) {

                    this.addChunk({x:i,y:j});
                }
            }
        }
        
        //console.log(chunkPositive);
    }
}