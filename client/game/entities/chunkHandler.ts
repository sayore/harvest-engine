import { Graphics, ObservablePoint, RenderTexture, Sprite, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/vector";
import { Entity } from "../entity";
import { VisibleChunk } from "./map/visibleChunk";
import { Player } from "./player";


export class ChunkHandler extends Entity implements IDrawable {
    MyGraphics: Graphics;
    fpsCounter: Text;
    drawnChunks: Map<string,VisibleChunk>;
    player:Player;
    emptyChunkTexture:RenderTexture;
    loadedChunks:Map<string,VisibleChunk>;

    constructor(
        
    ) {
        super();



    }
    Position: Vector;
    
    initialize() {
        this.player = this.game.getEntity<Player>("Player");

        this.MyGraphics = new Graphics();

        console.log(this.game.loader.resources)

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                
                var ts = new TilingSprite(this.game.loader.resources["rpgtileset"].texture,64,64);
                ts.tilePosition.x =-64;
                ts.tilePosition.y =-64;
                ts.y =64*i;
                ts.x =64*j;
                this.MyGraphics.addChild(ts);
            }
        }

        this.emptyChunkTexture = this.game.renderer.generateTexture(this.MyGraphics)
        var drawnEmptyChunk = new Sprite(this.emptyChunkTexture);
        var loadedChunks
        this.game.stage.addChild(drawnEmptyChunk);

        //this.MyGraphics.;
        this.fpsCounter = new Text("",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'red'});
        this.fpsCounter.x = 1000;
        this.fpsCounter.y = 50;
        this.fpsCounter.zIndex = 10
        this.fpsCounter.text = this.game.loader.resources["test"].data;
        this.game.gui.addChild(this.fpsCounter);
    }
 
    getChunkId(v:Vector) : string {
        return "1x"+v.x+"y"+v.y
    }
    private getChunkPosFromIdMode=0;

    getChunkPosFromId(id:string) : Vector {
        this.getChunkPosFromIdMode=0;
        let xpos="";
        let ypos="";
        for (let i = 0; i < id.length; i++) {
            const character = id[i];
            
            switch(this.getChunkPosFromIdMode) {
                case 0:
                    //First character returns Version of the Chunk ID's
                    if(character=='1') this.getChunkPosFromIdMode=100;
                    break;
                case 100:
                    if(this.getChunkPosFromIdMode==100 &&"1234567890.".indexOf(character)!==-1) {xpos+=character;}
                    else { 
                        if(character != 'y') {
                            console.error("Error Parsing Chunk Position, y didn't follow after x position."); return;
                        } else {
                            this.getChunkPosFromIdMode=101
                        }
                    }
                    break;
                case 101:
                    if("1234567890.".indexOf(character)!==-1) {ypos+=character;} else { console.error("After the y coordinate there was too much data."); return; }
                    break;
            }
        }
        return new Vector(Number(xpos),Number(ypos));
    }

    private amount = 1;
    private pauseCounter=0;
    postUpdate() {
        //this.amount+=1;
        //if(this.amount>10){
        //    this.amount=0;
        //    this.MyTileset3.tilePosition.y++;
        //    this.MyTileset2.tilePosition.x--;
        //    console.log(this.MyTileset3.tilePosition.y+" "+this.amount);
        //}

        this.fpsCounter.x = 150;
        this.fpsCounter.y = 20;
        this.fpsCounter.text = this.fpsCounter.y+"";
    }

    visibleChunkCheck() {
        //Take Player coordinate and send him all visible Chunks
        //(circle radius of about Screen Area + 2 Chunks around that. Unloaded Chunks should just be grass.)
        //Ideally this takes TileSize into account. (Which is currently 64)

        var topLeft = Vector.subNumber(this.player.Position,2000);
        var bottomRight = Vector.addNumber(this.player.Position,2000);
    }
}