import { Graphics } from 'pixi.js';

export class Dock {
    graphic: Graphics;
    full: boolean;
    free: boolean;
    y: number;

    constructor(graphic: Graphics, full: boolean, free: boolean, y: number) {
        this.graphic = graphic;
        this.full = full;
        this.free = free;
        this.y = y;
        
    }
}
