import { PortSimulationApp } from "./core/PortSimulationApp";

window.onload = () => {
    const gameAppRender = new PortSimulationApp(800, 500);
    gameAppRender.start();
};