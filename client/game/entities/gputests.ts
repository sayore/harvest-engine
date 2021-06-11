import { Graphics, Text } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class GPUTests extends ClientEntity implements IDrawable {
    Position: Vector;
    MyGraphics: Graphics;
    fpsCounter: Text;



    initialize() {
        this.MyGraphics = new Graphics();
        this.fpsCounter = new Text("No Text");
        this.fpsCounter.x = 1000;
        this.fpsCounter.y = 50;
        this.fpsCounter.zIndex = 10
        this.game.stage.addChild(this.MyGraphics);
        this.game.stage.addChild(this.fpsCounter);
    }

    private amount = 1;
    private pauseCounter=0;
    update() {
        this.fpsCounter.x = -this.game.stage.x+1000;
        this.fpsCounter.y = -this.game.stage.y+50;
        
        this.pauseCounter+=1;
        if(this.pauseCounter != 10) {
            this.fpsCounter.text = this.pauseCounter+" " + this.amount;
        } else {
            this.pauseCounter=0;
            this.fpsCounter.text = this.pauseCounter+" " + this.amount;

            var newRects = () => {
                this.MyGraphics.beginFill(Math.round(Math.random() * 0xFFFFFF));
                this.MyGraphics.drawRect(this.Position.x + this.amount % 200 * 4, this.Position.y + Math.floor(this.amount / 1000*4) + 20, 3, 3);
                this.MyGraphics.drawRect(this.Position.x + (this.amount+1) % 200 * 4, this.Position.y + Math.floor((this.amount+1) / 1000*4) + 20, 3, 3);
                this.MyGraphics.drawRect(this.Position.x + (this.amount+2) % 200 * 4, this.Position.y + Math.floor((this.amount+2) / 1000*4) + 20, 3, 3);
                this.MyGraphics.drawRect(this.Position.x + (this.amount+3) % 200 * 4, this.Position.y + Math.floor((this.amount+3) / 1000*4) + 20, 3, 3);
                this.MyGraphics.drawRect(this.Position.x + (this.amount+4) % 200 * 4, this.Position.y + Math.floor((this.amount+4) / 1000*4) + 20, 3, 3);
                this.MyGraphics.endFill();
                
                this.amount += 5;
            }
            if (this.amount < 1000000) {
                for (let i = 0; i < 5; i++) {
                    newRects();
                }

            }   
        }
    }
}