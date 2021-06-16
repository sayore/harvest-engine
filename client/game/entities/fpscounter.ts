import { Body, Circle, Polygon, Result } from "detect-collisions";
import { Graphics, Text } from "pixi.js";
import { ICollisionable } from "../../../lib/interface/ICollisionable";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class FPSCounterEntity extends ClientEntity implements IDrawable {
    fpsCounter:Text;
    MyGraphics: Graphics;

    Position = new Vector(200, 200);

    static c = 0;
    initialize() {
        this.MyGraphics = new Graphics();
        this.fpsCounter = new Text("No Text",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'black'});
        this.fpsCounter.x = 920;
        this.fpsCounter.y = 10;
        this.game.gui.addChild(this.fpsCounter);
    }


    update() {
        this.fpsCounter.text = (this.game.fpsMedian.reduce((a,y)=>(a+y))/this.game.fpsMedian.length).toPrecision(4) + "("+this.game.fpsMedian.length+")\n"+this.game.entities.length;
        this.fpsCounter.x = 100;
        this.fpsCounter.y = 100;

        this.MyGraphics.setTransform(this.Position.x, this.Position.y)
    }
}