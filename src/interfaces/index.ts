import { Dock } from '../models/DockModel';
import { Ship } from '../models/ShipModel';
import { DockView } from '../views/DockView';

export interface IDocks {
  [name: string]: Dock;
};

export interface IShips {
  lastId: number;
  redShips: Ship[];
  greenShips: Ship[];
}

export interface ILines {
  redLine: Ship[];
  greenLine: Ship[];
}

export interface IDocksSetting {
  docks: IDocks;
  dockView: DockView;
}


