import { Graphics, InteractionEvent, InteractivePointerEvent, Renderer } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Entity } from "../entity";

export class Mouse extends Entity implements IDrawable {
    MyGraphics:Graphics;

    constructor(
        public Position: [x: number, y: number] = [0,0]
        ) { super();

        
        }
    
    initialize() {
        this.MyGraphics = new Graphics();
            this.MyGraphics.beginFill(0xFFFFFF);
            this.MyGraphics.drawRect(this.Position[0],this.Position[1],64,64);
            this.MyGraphics.endFill();
            this.MyGraphics.alpha=0.5;
            this.game.stage.addChild(this.MyGraphics);

            
            this.game.stage.on("mousemove",(ev:any)=>{
                //console.log(ev.data);
                console.log(ev.data.global.x+", "+ev.data.global.y);
                this.Position[0] = ev.data.global.x-this.game.stage.x;
                this.Position[1] = ev.data.global.y-this.game.stage.y;
            });
    }

    private amount=1;
    update() {
        this.MyGraphics.x=this.Position[0]-this.Position[0]%64;
        this.MyGraphics.y=this.Position[1]-this.Position[1]%64;
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