import { Application } from 'pixi.js';
import { DocksService } from '../services/DocksService';
import { IDocksSetting } from '../interfaces';

export class DockController {
    private app: Application;
    private docksService: DocksService;

    constructor(app: Application) {
        this.app = app;
        this.docksService = new DocksService(app);
    }

    initialize(): void {
        for (let i = 0; i < 4; i++) {
            this.docksService.createDocks(i);     
        }
        this.docksService.createGatePort()
    }

    getDocksSetting(): IDocksSetting { 
        return {
            docks: this.docksService.docks,
            dockView: this.docksService.dockView
        };
    }    
}
