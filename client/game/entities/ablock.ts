import { Body, Circle, Polygon, Result } from "detect-collisions";
import { Graphics } from "pixi.js";
import { ICollisionable } from "../../../lib/interface/ICollisionable";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class ABlock extends ClientEntity implements IDrawable, ICollisionable {
    collided(result: Result): void {
        if(this.movable==false) return;
        this.Position.x -= result.overlap * result.overlap_x;
        this.Position.y -= result.overlap * result.overlap_y;

        return;
    }
    Type = "ABlock";
    CollisionBox: Body;
    getColliders(): Body[] {
        if (!this.CollisionBox) return [];

        return [this.CollisionBox]
    }
    private movable=false;
    canMove(): boolean {
        return this.movable;
    }

    MyGraphics: Graphics;

    Position = new Vector(200, 200);

    static c = 0;
    initialize() {
        this.MyGraphics = new Graphics();
        
        switch(ABlock.c%2){
            case 0: this.movable=true;
        }

        switch(ABlock.c%4){
            case 0: 
                this.CollisionBox = this.game.CollisionSystem.createCircle(this.Position.x - 32, this.Position.y - 32, 32);
                this.MyGraphics.beginFill(0x00FFFF);
                this.MyGraphics.drawCircle(0, 0, 32);
                this.MyGraphics.endFill();
                this.MyGraphics.setTransform(this.Position.x, this.Position.y)
                this.game.stage.addChild(this.MyGraphics);
                break;
            case 1:
                var points = [
                    -32, -32,
                    + 32, -32,
                    + 32, +32,
                    -32, +32
                ];
                this.CollisionBox = this.game.CollisionSystem.createPolygon(
                    this.Position.x, this.Position.y,this.makeCollisionSystemPoints(points));
                this.MyGraphics.beginFill(0xFF00FF);
                this.MyGraphics.drawPolygon(points);
                this.MyGraphics.endFill();
                
                this.MyGraphics.setTransform(this.Position.x, this.Position.y)
                this.game.stage.addChild(this.MyGraphics);
                break;
            case 2:
                var points = [
                    + 32, -32,
                    + 32, +32,
                    -32, +32
                ];
                this.CollisionBox = this.game.CollisionSystem.createPolygon(
                    this.Position.x, this.Position.y,this.makeCollisionSystemPoints(points));
                this.MyGraphics.beginFill(0xFFFF00);
                this.MyGraphics.drawPolygon(points);
                this.MyGraphics.endFill();
                
                this.MyGraphics.setTransform(this.Position.x, this.Position.y)
                this.game.stage.addChild(this.MyGraphics);
                break;
            case 3:
                var points = [
                    -20,-32,
                    20,-32,
                    32,-20,
                    32,20,
                    20,+32,
                    -20,+32,
                    -32,20,
                    -32,-20,
                ];
                this.CollisionBox = this.game.CollisionSystem.createPolygon(
                    this.Position.x, this.Position.y,this.makeCollisionSystemPoints(points));
                this.MyGraphics.beginFill(0xFFFF00);
                this.MyGraphics.drawPolygon(points);
                this.MyGraphics.endFill();
                
                this.MyGraphics.setTransform(this.Position.x, this.Position.y)
                this.game.stage.addChild(this.MyGraphics);
                break;
        }


        
        this.MyGraphics.beginFill(0xFFFFFF);
        this.MyGraphics.drawCircle(0, 0, 7);
        this.MyGraphics.endFill();
        this.MyGraphics.beginFill((this.movable?0xBBBBBB:0x222222));
        this.MyGraphics.drawCircle(0, 0, 5);
        this.MyGraphics.endFill();


        this.CollisionBox.owner = this;
        ABlock.c++;
    }

    makeCollisionSystemPoints(points: number[]): number[][] {
        var out = [];
        for (var i = 0; i != points.length; i += 2) {
            out.push([points[i], points[i + 1]]);
        }
        return out;
    }

    update() {
        this.CollisionBox.x = this.Position.x - 32;
        this.CollisionBox.y = this.Position.y - 32;
        this.MyGraphics.setTransform(this.Position.x, this.Position.y)
    }
}