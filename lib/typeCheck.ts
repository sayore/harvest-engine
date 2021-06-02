import { ICollisionable } from "./interface/ICollisionable";
import { IDrawable } from "./interface/IDrawable";

export class TypeCheck {
    static isCollidable(obj:any) : obj is ICollisionable {
        return (obj as ICollisionable).getColliders !== undefined;
    }
    static isDrawable(obj:any) {
        return (obj as IDrawable).Position !== undefined;
    }
}