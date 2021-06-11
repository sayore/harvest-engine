import { Body, Result } from "detect-collisions";

export interface ICollisionable {
    getColliders() : Body[];
    canMove() : boolean;
    collided(result:Result) : void;
}