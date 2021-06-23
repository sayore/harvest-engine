import { ITypeable } from '../interface/ITypeable';


class DragObject implements ITypeable {
    Type: string = "DragObject";
    
    constructor(
        public Object: any,
        public TypeOfDrag = DragKind.Item
    ) {
        
    }
}

export enum DragKind {
    Item
}