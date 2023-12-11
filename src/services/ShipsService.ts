import { Application, Graphics } from 'pixi.js';
import { Ship } from '../models/ShipModel';
import { IShips, ILines, IDocksSetting, IDocks } from '../interfaces';
import { RandomUtils } from '../utils/RandomUtils';
import * as TWEEN from '@tweenjs/tween.js';
import { Dock } from '../models/DockModel';
import { ShipView } from '../views/ShipView';
import { DockView } from '../views/DockView';

export class ShipsService {
    private app: Application;
    private ships: IShips;
    private lines: ILines;
    private shipView: ShipView;

    constructor(app: Application) {
        this.app = app;
        this.shipView = new ShipView(app.stage);
        this.ships = {
            lastId: 0,
            redShips: [],
            greenShips: [],
        }
        this.lines = {
            redLine: [],
            greenLine: [],
        };
    }
    
    createShips(docks: IDocks, dockViewParams: Function) {
        let startTime = Date.now();
        let randomTime = RandomUtils.mathRoundRandom(1000, 8000);
        this.app.ticker.add(() => {
            TWEEN.update();
            const randomShip = RandomUtils.mathRoundRandom(-10, 10);
            const actualTime = Date.now();
            if (actualTime - startTime > randomTime) {
                let ship;
                if (randomShip > 0) {
                    ship = this.shipView.render(this.ships.lastId++, "green")
                    this.ships.greenShips.push(ship);
                } else {
                    ship = this.shipView.render(this.ships.lastId++, "red")
                    this.ships.redShips.push(ship);
                }
                
                this.shipView.addShipView(ship.graphic);
                this.processShipComeToPort(ship, docks, dockViewParams);
                startTime = Date.now();
                randomTime = RandomUtils.mathRoundRandom(1000, 8000);
            }
            this.processEndOfWaiting(docks, dockViewParams);
        })
    }

    processEndOfWaiting(docks: IDocks, dockViewParams: Function) {
        for (const dock in docks) {
            if (docks[dock].full) {
                if(docks[dock].free){
                    for (let i = this.lines.greenLine.length-1; i >= 0; i--) {
                        const ship = this.lines.greenLine[i];
                        ship?.graphic?.position.set(
                            100,
                            docks[dock].y + 30
                        )
                        docks[dock].free = false;
                        docks[dock].full = false;
                        this.lines.greenLine.splice(i, 1);
                        this.processShipOutFromPort(ship, docks[dock]);
                        dockViewParams(docks[dock].graphic, !docks[dock].full);
                        break;
                    }
                    break;
                }
            } else if (!docks[dock].full) {
                if(docks[dock].free) {
                    for (let i = this.lines.redLine.length-1; i >= 0; i--) {
                        const ship = this.lines.redLine[i];
                        ship?.graphic?.position.set(
                            100,
                            docks[dock].y + 30
                        )
                        docks[dock].free = false;
                        docks[dock].full = true;

                        this.lines.redLine.splice(i, 1);
                        this.processShipOutFromPort(ship, docks[dock]);
                        dockViewParams(docks[dock].graphic, !docks[dock].full);
                        break;
                    }
                    break;
                }
            }
        }
    }
    
    processShipComeToPort(ship: Ship, docks: IDocks, dockViewParams: Function): void {
        this.shipView.handleAnimationShipComeTo(ship)
            .onComplete(() => {
            if (ship.type === 'red') {
                let busyDocks = 0;
                for (const dock in docks) {
                    if (!docks[dock].full) {
                        if (docks[dock].free) {
                            const dockPositionY = docks[dock].y + 30
                            ship.graphic = this.shipView.setShipPosition(ship.graphic, dockPositionY)
                            docks[dock].free = false;
                            docks[dock].full = true;
                            dockViewParams(docks[dock].graphic, !docks[dock].full);
                            this.processShipOutFromPort(ship, docks[dock]);
                            break;
                        } else {
                            busyDocks++;
                        }
                    } else {
                        busyDocks++;
                    }
                }
                if (busyDocks === 4) {
                    this.lines.redLine.push(ship);
                    this.shipView.waitAndSetPosition(ship, this.lines);
                }
            } else {
                let busyDocks = 0;
                for (const dock in docks) {
                    if (docks[dock].full) {
                        if(docks[dock].free){
                            ship?.graphic?.position.set(
                                100,
                                docks[dock].y + 30
                            )
                            docks[dock].free = false;
                            docks[dock].full = false;
                            dockViewParams(docks[dock].graphic, !docks[dock].full);
                            this.processShipOutFromPort(ship, docks[dock]);
                            break;
                        } else {
                            busyDocks++;
                        }
                    } else {
                        busyDocks++;
                    }
                }
                if (busyDocks === 4) {
                    this.lines.greenLine.push(ship);
                    this.shipView.waitAndSetPosition(ship, this.lines);
                }    
        }})
        .start();
    }

    processShipOutFromPort(ship: Ship, dock: Dock) {
        this.shipView.handleAnimationShipOutFrom(ship)
        .onComplete(()=>{
            dock.free = true;
            if (ship.type === 'red') {
                this.ships.redShips.forEach((unit, i, src) => {
                    if (unit.id === ship.id) {
                        src.splice(i, 1);
                    }
                })
            } else {
                this.ships.greenShips.forEach((unit, i, src) => {
                    if (unit.id === ship.id) {
                        src.splice(i, 1);
                    }
                })
            }
            this.shipView.removeShipView(ship.graphic);
        });
    }
}
