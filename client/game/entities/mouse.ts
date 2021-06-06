import { Graphics, InteractionEvent, InteractivePointerEvent, Renderer, Text } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/vector";
import { Entity } from "../entity";

export class Mouse extends Entity implements IDrawable {
    MyGraphics:Graphics;
    tilePos: Text;
    Position: Vector=<Vector>{x:0,y:0};
    
    initialize() {
        this.MyGraphics = new Graphics();
            this.MyGraphics.beginFill(0xFFFFFF);
            this.MyGraphics.drawRect(this.Position.x,this.Position.y,64,64);
            this.MyGraphics.endFill();
            this.MyGraphics.alpha=0.5;
            
            this.game.stage.addChild(this.MyGraphics);
            
            
            this.tilePos = new Text("No Text",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'black'});
        this.tilePos.x = 20;
        this.tilePos.y = 20;
        this.tilePos.zIndex=-100;
        this.game.gui.addChild(this.tilePos);
            
        this.game.stage.on("mousemove",(ev:any)=>{
            //console.log(ev.data);
            //console.log(ev.data.global.x+", "+ev.data.global.y);
            this.Position.x = ev.data.global.x-this.game.stage.x;
            this.Position.y = ev.data.global.y-this.game.stage.y;
            if(this.Position.x<0) {
                this.Position.x-=64;
            }
            if(this.Position.y<0) {
                this.Position.y-=64;
            }
            this.MyGraphics.x=this.Position.x-this.Position.x%64;
            this.MyGraphics.y=this.Position.y-this.Position.y%64;
        });
    }

    guiInit() {
        
    }

    private amount=1;
    postUpdate() {
        this.tilePos.text=""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64);
    }

    draw() {
        /*this.game.context.fillStyle = "#BB2200";
        this.game.context.fillRect(
            this.Position.x + 0,
            this.Position.y + 0,
            50,
            50);*/
    }
}