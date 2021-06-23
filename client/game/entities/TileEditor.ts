import { Graphics, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class Tileeditor extends ClientEntity implements IDrawable {
    Position: Vector;
    MyGraphics:Graphics;
    
    initialize() {
        this.MyGraphics = new Graphics();
        var ts = new TilingSprite(this.Game.Loader.resources["rpgtileset"].texture,64,64);
            
        this.MyGraphics.addChild(ts);
        this.Game.stage.addChild(this.MyGraphics);
    }

    private amount=1;
    update() {
        this.MyGraphics.x+=Math.random()*this.amount-this.amount+2;
        this.MyGraphics.y+=Math.random()*this.amount-this.amount+2;
        this.amount*=1.01;
    }
}