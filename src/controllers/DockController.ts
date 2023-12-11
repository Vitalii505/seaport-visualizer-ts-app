import { Application } from 'pixi.js';
import { DocksService } from '../services/DocksService';
import { IDocksSetting } from '../interfaces';
import { IDocks } from '../interfaces/index';
import { DockView } from '../views/DockView';

export class DockController {
    private app: Application;
    private docksService: DocksService;
    dockView: DockView;
    docks: IDocks;

    constructor(app: Application) {
        this.app = app;
        this.docksService = new DocksService(app);
        this.docks = this.docksService.docks;
        this.dockView = this.docksService.dockView;
    }

    initialize(): void {
        for (let i = 0; i < 4; i++) {
            this.docksService.createDocks(i);     
        }
        this.docksService.createGatePort()
    }
}
