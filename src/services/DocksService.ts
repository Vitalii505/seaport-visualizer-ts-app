import { Application, Graphics } from 'pixi.js';
import { IDocks } from '../interfaces';
import { Dock } from '../models/DockModel';
import { DockView } from '../views/DockView';

export class DocksService {
  docks: IDocks;
  dockView: DockView;

  constructor(app: Application) {
    this.docks = {};
    this.dockView = new DockView(app);
  }
  
  createDocks(index: number): void {
    const dockGraphic = this.dockView.render(index);
    const positionY = 20 + (index * 120);
    dockGraphic.position.set(5, positionY);
    const dockModel = new Dock(
      dockGraphic,
      false,
      true,
      positionY,
    );
    this.docks[`dock_${index}`] = dockModel; 
  }

  createGatePort() {
    for (let i = 0; i < 2; i++) {
      this.dockView.renderGatePort(i);
    }
  }
}
