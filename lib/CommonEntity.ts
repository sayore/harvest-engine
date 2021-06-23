import { CommonGame } from "./CommonGame";
import { ITypeable } from "./interface/ITypeable";

export class CommonEntity implements ITypeable{
    Type: string="CommonEntity";
    Game:CommonGame;
    
    initialize() {}
    preUpdate(progress:number) {}
    update(progress:number) {}
    postUpdate(progress:number) {}
    unload() {}
}