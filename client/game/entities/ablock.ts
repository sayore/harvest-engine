import { Body, Circle, Polygon, Result } from "detect-collisions";
import { Graphics } from "pixi.js";
import { ICollisionable } from "../../../lib/interface/ICollisionable";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { OwnerKnowingBody } from "../../../lib/types/ownerKnowingBody";
import { Vector } from "../../../lib/types/vector";
import { Entity } from "../entity";

export class ABlock extends Entity implements IDrawable, ICollisionable {
    collided(result:Result): void {
        this.Position.x -= result.overlap * result.overlap_x;
		this.Position.y -= result.overlap * result.overlap_y;
        
        return;
    }
    Type = "ABlock";
    CollisionBox: Circle;
    getColliders(): Body[] {
        if(!this.CollisionBox) return [];

        return [this.CollisionBox]
    }
    canMove(): boolean {
        return true;
    }

    MyGraphics:Graphics;

    Position= new Vector(200,200);

    initialize() {
        this.MyGraphics = new Graphics();
        this.MyGraphics.beginFill(0xFFFFFF);
        this.MyGraphics.drawCircle(0,0,32);
        this.MyGraphics.endFill();
        this.MyGraphics.setTransform(this.Position.x, this.Position.y)
        this.game.stage.addChild(this.MyGraphics);

        this.CollisionBox = this.game.CollisionSystem.createCircle(this.Position.x-32, this.Position.y-32, 32);
        this.CollisionBox.owner=this;
    }

    update() {
        this.CollisionBox.x = this.Position.x-32;
        this.CollisionBox.y = this.Position.y-32;
        this.MyGraphics.setTransform(this.Position.x, this.Position.y)
    }
}