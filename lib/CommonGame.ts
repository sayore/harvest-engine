import { CommonEntity } from "./CommonEntity";
import { ITypeable } from "./interface/ITypeable";

export class CommonGame implements ITypeable{
    Type: string="CommonGame";
    initialized: boolean;
    public entities: CommonEntity[] = [];
    add(entity: CommonEntity) {
        entity.game = this;
        this.entities.push(entity);

        if(this.initialized) entity.initialize();
    }

    getEntity<T extends CommonEntity>(type:string) : T {
        return <T>this.entities.find((e)=>e.Type==type);
    }
    getEntities<T extends CommonEntity>(type:string) : T[] {
        return <T[]>this.entities.filter((e)=>e.Type==type);
    }

    removeEntity(entity: CommonEntity) {
        entity.unload();
        this.entities = this.entities.filter(e => e!=entity);
    }

    update(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(progress);
        }
    }
    preUpdate(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].preUpdate(progress);
        }
    }
    postUpdate(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].postUpdate(progress);
        }
    }
}