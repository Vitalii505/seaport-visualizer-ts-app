import { Application, ICanvas } from 'pixi.js';
import { PortSimulationController } from '../controllers/PortSimulationController';

export class PortSimulationApp {
    private app: Application;
    private gameController: PortSimulationController;

    constructor(width: number, height: number) {
        this.app = new Application({
            width,
            height,
            backgroundColor: 0x0000ff,
        });
        document.body.appendChild(this.app.view  as ICanvas | unknown as HTMLElement | any);

        this.gameController = new PortSimulationController(this.app);
        this.gameController.initialize();
    }

    public start(): void {
        this.app.ticker.add(delta => this.gameController.update(delta));
    }
}