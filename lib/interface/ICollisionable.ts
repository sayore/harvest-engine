import { Body } from "detect-collisions";

export interface ICollisionable {
    getColliders() : Body[];
    canMove() : boolean;
}