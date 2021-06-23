import { CommonEntity } from "./CommonEntity";
import { ICollisionable } from "./interface/ICollisionable";
import { ITypeable } from "./interface/ITypeable";
import { TypeCheck } from "./typeCheck";

export class CommonGame implements ITypeable{
    Type: string="CommonGame";
    initialized: boolean;
    public Entities: CommonEntity[] = [];
    movableEntities : (ICollisionable)[] = [];

    add(entity: CommonEntity) {
        entity.Game = this;
        this.Entities.push(entity);

        if(TypeCheck.isCollidable(entity)) this.movableEntities.push(entity);
        if(this.initialized) entity.initialize();
    }

    getEntity<T extends CommonEntity>(type:string) : T {
        return <T>this.Entities.find((e)=>e.Type==type);
    }
    getEntities<T extends CommonEntity>(type:string) : T[] {
        return <T[]>this.Entities.filter((e)=>e.Type==type);
    }

    removeEntity(entity: CommonEntity) {
        entity.unload();
        this.Entities = this.Entities.filter(e => e!=entity);
    }

    update(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.Entities.length; i++) {
            this.Entities[i].update(progress);
        }
    }
    preUpdate(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.Entities.length; i++) {
            this.Entities[i].preUpdate(progress);
        }
    }
    postUpdate(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.Entities.length; i++) {
            this.Entities[i].postUpdate(progress);
        }
    }
}