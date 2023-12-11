import { Graphics } from 'pixi.js';

export class Ship {
  id: number;
  type: string;
  graphic: Graphics;

  constructor(
    id: number, 
    type: string,
    graphic: Graphics
  ) {
      this.id = id;
      this.type = type;
      this.graphic = graphic;
  }
}