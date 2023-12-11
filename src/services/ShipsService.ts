import { Application, Graphics } from 'pixi.js';
import { Ship } from '../models/ShipModel';
import { IShips, ILines, IDocksSetting, IDocks } from '../interfaces';
import { RandomUtils } from '../utils/RandomUtils';
import * as TWEEN from '@tweenjs/tween.js';
import { Dock } from '../models/DockModel';
import { ShipView } from '../views/ShipView';

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
    
    createShips(docksSetting: IDocksSetting) {
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
                this.shipComeToPort(ship, docksSetting);
                startTime = Date.now();
                randomTime = RandomUtils.mathRoundRandom(1000, 8000);
            }
            this.endOfWaiting(docksSetting);
        })
    }

    endOfWaiting(docksSetting: IDocksSetting) {
        for (const dock in docksSetting.docks) {
            if (docksSetting.docks[dock].full) {
                if(docksSetting.docks[dock].free){
                    for (let i = this.lines.greenLine.length-1; i >= 0; i--) {
                        const ship = this.lines.greenLine[i];
                        ship?.graphic?.position.set(
                            100,
                            docksSetting.docks[dock].y + 30
                        )
                        docksSetting.docks[dock].free = false;
                        docksSetting.docks[dock].full = false;
                        this.lines.greenLine.splice(i, 1);
                        this.shipOutFromPort(ship, docksSetting.docks[dock]);
                        docksSetting.dockView.docsDraw(docksSetting.docks[dock].graphic, !docksSetting.docks[dock].full);
                        break;
                    }
                    break;
                }
            } else if (!docksSetting.docks[dock].full) {
                if(docksSetting.docks[dock].free) {
                    for (let i = this.lines.redLine.length-1; i >= 0; i--) {
                        const ship = this.lines.redLine[i];
                        ship?.graphic?.position.set(
                            100,
                            docksSetting.docks[dock].y + 30
                        )
                        docksSetting.docks[dock].free = false;
                        docksSetting.docks[dock].full = true;

                        this.lines.redLine.splice(i, 1);
                        this.shipOutFromPort(ship, docksSetting.docks[dock]);
                        docksSetting.dockView.docsDraw(docksSetting.docks[dock].graphic, !docksSetting.docks[dock].full);
                        break;
                    }
                    break;
                }
            }
        }
    }
    
    shipComeToPort(ship: Ship, docksSetting: IDocksSetting) {
        this.shipView.handleAnimationShipComeTo(ship)
            .onComplete(() => {
            if (ship.type === 'red') {
                let busyDocks = 0;
                for (const dock in docksSetting.docks) {
                    if (!docksSetting.docks[dock].full) {
                        if (docksSetting.docks[dock].free) {
                            const dockPositionY = docksSetting.docks[dock].y + 30
                            ship.graphic = this.shipView.setShipPosition(ship.graphic, dockPositionY)
                            docksSetting.docks[dock].free = false;
                            docksSetting.docks[dock].full = true;
                            docksSetting.dockView.docsDraw(docksSetting.docks[dock].graphic, !docksSetting.docks[dock].full);
                            this.shipOutFromPort(ship, docksSetting.docks[dock]);
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
                let busyPiers = 0;
                for (const dock in docksSetting.docks) {
                    if (docksSetting.docks[dock].full) {
                        if(docksSetting.docks[dock].free){
                            ship?.graphic?.position.set(
                                100,
                                docksSetting.docks[dock].y + 30
                            )
                            docksSetting.docks[dock].free = false;
                            docksSetting.docks[dock].full = false;
                            docksSetting.dockView.docsDraw(docksSetting.docks[dock].graphic, !docksSetting.docks[dock].full);
                            this.shipOutFromPort(ship, docksSetting.docks[dock]);
                            break;
                        } else {
                            busyPiers++;
                        }
                    } else {
                        busyPiers++;
                    }
                }
                if (busyPiers === 4) {
                    this.lines.greenLine.push(ship);
                    console.log("4.2 - ***--> Service: shipComeToPort() - this.lines : <--***  ", this.lines);
                    this.shipView.waitAndSetPosition(ship, this.lines);
                }    
        }})
        .start();
    }

    shipOutFromPort(ship: Ship, dock: Dock) {
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
            this.app.stage.removeChild(ship.graphic ? ship.graphic : new Graphics());
        });
    }
}
