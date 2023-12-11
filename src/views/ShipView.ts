import { Container, Graphics } from 'pixi.js';
import { Ship } from '../models/ShipModel';
import { AnimationTweenUtils } from '../utils/AnimationTweenUtils';
import { ILines } from '../interfaces';

export class ShipView {
    app: Container;
    
    constructor(app: Container) { 
        this.app = app;
    }

    public render(shipId: number, shipType: string): Ship {
        const ship = new Ship(
            shipId,
            shipType,
            new Graphics(),
        );
        this.shipViewParams(ship);
        ship.graphic.position.set(900, 190);
        return ship;
    }

    addShipView(ship: Graphics) {
        this.app.addChild(ship);
    }

    removeShipView(ship: Graphics) {
        this.app.removeChild(ship);
    }

    handleAnimationShipComeTo (ship: Ship) {
        return AnimationTweenUtils.isComeTo(ship.graphic, {x: 300}, 5000)
    };

    handleAnimationShipOutFrom(ship: Ship) {
        return AnimationTweenUtils.isOutFrom(ship.graphic, { x: 1000 }, 4000, 5000)
        .onStart(() => {
            ship.graphic.clear();
            this.shipViewParams(ship, true);
            ship?.graphic?.position.set(400, 300)
        })
    };

    setShipPosition(shipGraphic: Graphics, dockPositionY: number): Graphics {
        shipGraphic?.position.set(
            100,
            dockPositionY
        )
        return shipGraphic;
    }

    
    waitAndSetPosition(ship: Ship, lines: ILines) {
        if (ship.type === 'red') {
            ship.graphic.x = 200 + (110 * lines.redLine.length);
            ship.graphic.y = 110;
        } else if (ship.type === 'green') {
            ship.graphic.x = 200 + (110 * lines.greenLine.length);
            ship.graphic.y = 350;
        }
    }

    shipViewParams(ship: Ship, redraw = false) { 
        let color: number;
        let fill: number[];
        if (!redraw) {
            if (ship.type === 'red') {
            color = 0xff0000;
            fill = [color];
            } else {
            color = 0x00ff00;
            fill = [0, 0];
            }
        } else {
            if (ship.type === 'red') {
                color = 0xff0000;
                fill = [0, 0];
            } else {
                color = 0x00ff00;
                fill = [color];
            }
        }
        ship.graphic.lineStyle(5, color);
        ship.graphic.beginFill(...fill);
        ship.graphic.drawRect(0, 0, 100, 35);
    }
}
