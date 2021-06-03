import { Graphics, ObservablePoint, Sprite, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Entity } from "../entity";


export class Map extends Entity implements IDrawable {
    MyGraphics: Graphics;
    fpsCounter: Text;

    constructor(
        public Position: [x: number, y: number] = [0, 0]
    ) {
        super();



    }
    
    initialize() {
        this.MyGraphics = new Graphics();

        console.log(this.game.loader.resources)

        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                
                var ts = new TilingSprite(this.game.loader.resources["rpgtileset"].texture,64,64);
                ts.tilePosition.x =-64*Math.floor(Math.random()*20);
                ts.tilePosition.y =-64*Math.floor(Math.random()*10);
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
        this.fpsCounter = new Text(this.game.loader.resources["test"].data);
        this.fpsCounter.x = 1000;
        this.fpsCounter.y = 50;
        this.fpsCounter.zIndex = 10
        this.game.stage.addChild(this.fpsCounter);
    }

    private amount = 1;
    private pauseCounter=0;
    update() {
        //this.amount+=1;
        //if(this.amount>10){
        //    this.amount=0;
        //    this.MyTileset3.tilePosition.y++;
        //    this.MyTileset2.tilePosition.x--;
        //    console.log(this.MyTileset3.tilePosition.y+" "+this.amount);
        //}
    }

    draw() {
        /*this.game.context.fillStyle = "#BB2200";
        this.game.context.fillRect(
            this.Position[0] + 0,
            this.Position[1] + 0,
            50,
            50);*/
    }
}