import { Vector } from '../types/Vector';

export class TileUpdateRequest {
  
  constructor(
    public chunkPosition: Vector,
    public tileInChunk: Vector,
    public typeOfUpdate: TypeOfUpdate,
    ) {}
}

export enum TypeOfUpdate {
  Point,
  /**
   * @deprecated
   */
  Rectangle,
  Circle,
  Other
}