import { Graphics, ObservablePoint, Sprite, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/vector";
import { Entity } from "../entity";
import { VisibleChunk } from "./map/visibleChunk";
import { Player } from "./player";


export class Map extends Entity implements IDrawable {
    MyGraphics: Graphics;
    fpsCounter: Text;
    drawnChunks: VisibleChunk[];
    player:Player;
    

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

        var generatedTexture = this.game.renderer.generateTexture(this.MyGraphics)

        this.game.stage.addChild(
            new Sprite(generatedTexture) 
        );

        //this.MyGraphics.;
        this.fpsCounter = new Text("",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'red'});
        this.fpsCounter.x = 1000;
        this.fpsCounter.y = 50;
        this.fpsCounter.zIndex = 10
        this.fpsCounter.text = this.game.loader.resources["test"].data;
        this.game.gui.addChild(this.fpsCounter);
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