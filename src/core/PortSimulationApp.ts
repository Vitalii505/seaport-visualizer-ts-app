import { Application, ICanvas } from 'pixi.js';
import { PortSimulationController } from '../controllers/PortSimulationController';

export class PortSimulationApp {
    private app: Application;
    private gameController: PortSimulationController;

    constructor() {
        this.app = new Application({
            width: 800,
            height: 600,
            backgroundColor: 0x0000ff,
        });
        document.body.appendChild(this.app.view  as ICanvas | HTMLElement | any);

        this.gameController = new PortSimulationController(this.app);
        this.gameController.initialize();
    }
}