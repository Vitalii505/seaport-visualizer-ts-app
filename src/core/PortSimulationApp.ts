import { Application, ICanvas } from 'pixi.js';
import { PortSimulationController } from '../controllers/PortSimulationController';

export class PortSimulationApp {
    private app: Application = new Application({
        width: 800,
        height: 500,
        backgroundColor: 0x00ffff,
    });
    private gameController: PortSimulationController =
        new PortSimulationController(this.app);

    constructor() {
        try {
            document.body.appendChild(this.app.view as ICanvas | HTMLElement | any);
            this.gameController = new PortSimulationController(this.app);
            this.gameController.initialize();
        } catch (error) {
            console.error("Error initialize PortSimulationApp", error);
        }
    }
}