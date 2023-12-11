
import { Application, Container } from 'pixi.js';
import { ShipsService } from '../services/ShipsService';
import {IDocksSetting } from '../interfaces';

export class ShipController {
    private app: Application;
    private shipService: ShipsService;

    constructor(app: Application) {
        this.app = app;
        this.shipService = new ShipsService(app);
    }

    initialize(docksSettings: IDocksSetting): void {
        this.shipService.createShips(docksSettings); 
    }
}
