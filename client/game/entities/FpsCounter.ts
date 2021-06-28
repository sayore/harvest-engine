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
        this.fpsCounter = new Text("No Text",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'black',padding:5});
        this.fpsCounter.x = 920;
        this.fpsCounter.y = 10;
        this.fpsCounter.resolution = 4;
        this.Game.gui.addChild(this.fpsCounter);
    }


    update() {
        if(this.Game.FpsMedian.length==0) return;
        this.fpsCounter.text = (this.Game.FpsMedian.reduce((a,y)=>(a+y))/this.Game.FpsMedian.length).toPrecision(4) + "("+this.Game.FpsMedian.length+")\n"+this.Game.Entities.length;
        this.fpsCounter.x = 10;
        this.fpsCounter.y = 120;

        this.MyGraphics.setTransform(this.Position.x, this.Position.y)
    }
}