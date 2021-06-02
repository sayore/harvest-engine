import { Graphics } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Entity } from "../entity";

export class ABlock extends Entity implements IDrawable {
    MyGraphics:Graphics;

    constructor(
        public Position: [x: number, y: number] = [0,0]
        ) { super();

            
        
        }
    
    initialize() {
        this.MyGraphics = new Graphics();
            this.MyGraphics.beginFill(0xFFFFFF);
            this.MyGraphics.drawRect(this.Position[0],this.Position[1],100,100);
            this.MyGraphics.endFill();
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