// import { GameApp } from './1...test/src/app/app';

import { PortSimulationApp } from "./core/PortSimulationApp";


window.onload = () => {
    // const gameAppRender = new GameApp(600, 500);
    // gameAppRender.start();

    const gameAppRender = new PortSimulationApp(800, 500);
    gameAppRender.start();
};