import { Body, Result } from "detect-collisions";
import { Entity } from "../../client/game/entity";
import { OwnerKnowingBody } from "../types/ownerKnowingBody";

export interface ICollisionable {
    getColliders() : OwnerKnowingBody[];
    canMove() : boolean;
    collided(result:Result) : void;
}