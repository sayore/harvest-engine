import { Graphics, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/vector";
import { Entity } from "../entity";

export class Tileeditor extends Entity implements IDrawable {
    Position: Vector;
    MyGraphics:Graphics;
    
    initialize() {
        this.MyGraphics = new Graphics();
        var ts = new TilingSprite(this.game.loader.resources["rpgtileset"].texture,64,64);
            
        this.MyGraphics.addChild(ts);
        this.game.stage.addChild(this.MyGraphics);
    }

    private amount=1;
    update() {
        this.MyGraphics.x+=Math.random()*this.amount-this.amount+2;
        this.MyGraphics.y+=Math.random()*this.amount-this.amount+2;
        this.amount*=1.01;
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