import { Application } from 'pixi.js';
import { ShipController } from './ShipController';
import { DockController } from './DockController';

export class PortSimulationController {
    public app: Application;
    private shipController: ShipController;
    private dockController: DockController;

    constructor(app: Application) {
        this.app = app;
        this.dockController = new DockController(app);
        this.shipController = new ShipController(app);
    }

    initialize(): void {
        this.dockController.initialize();
        this.shipController.initialize(
            this.dockController.getDocksSetting()
        );
    }

    update(delta: number): void {}
}