import { Graphics, Application } from 'pixi.js';

export class DockView {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }
    
    public render(index: number) {
        const dockGraphic = new Graphics();
        this.dockViewParams(dockGraphic, true);
        dockGraphic.position.set(5, 20 + (index * 120))
        this.app.stage.addChild(dockGraphic);
        return dockGraphic;
    }

    
    renderGatePort(index: number): void {
        const gate = new Graphics();
        gate.lineStyle(5, 0xffff00);
        gate.beginFill(0xffff00);
        gate.drawRect(250, 0 + (index * 350), 10, 150);
        this.app.stage.addChild(gate);
    }

    dockViewParams(dockGraphic: Graphics, toEmpty: boolean) {
        if (!toEmpty) {
            dockGraphic.clear();
            dockGraphic.lineStyle(5, 0xffff00);
            dockGraphic.beginFill(0xffff00);
            dockGraphic.drawRect(0, 0, 40, 100);
        } else {
            dockGraphic.clear();
            dockGraphic.lineStyle(5, 0xffff00);
            dockGraphic.beginFill(0, 0);
            dockGraphic.drawRect(0, 0, 40, 100);
        }
    }

    
}
