
import { Application, Container } from 'pixi.js';
import { ShipsService } from '../services/ShipsService';
import {IDocks } from '../interfaces';
import { DockView } from '../views/DockView';

export class ShipController {
    private app: Application;
    private shipService: ShipsService;

    constructor(app: Application) {
        this.app = app;
        this.shipService = new ShipsService(app);
    }

    initialize(docks: IDocks, dockViewParams: Function): void {
        this.shipService.createShips(docks, dockViewParams); 
    }
}
