# 🚢 Seaport Visualizer Simulator

## 🖨 Technologies and Tools

- TypeScript
- Pixi.js
- Tween.js

## 🎮 Process

1. There is a rectangular "seaport" working field
2. On one side of the seaport is the port
    - Port – a rectangular area with one entrance
    - Only one ship can pass through the entrance at a time
    - There are 4 piers in the port, all of them are empty at the beginning.
    - The pier is a rectangular area. If the wharf is filled with cargo, the rectangle is filled with color. Otherwise - transparent
    - One ship can sail to one pier at the same time. The capacity of the pier is exactly the same as the capacity of the ship. That is, 1 ship fills or empties the cargo completely.
3. Ships are green or red rectangles. They bring cargo to the port and empty it
    - There are 2 types of ships: green - come for cargo; red ones come with a load
    - A filled ship is displayed as a filled-in color rectangle
    - The ship can approach only the free pier
    - The ship has the same capacity as the wharf, so it is fully unloaded or loaded
    - Red ships enter full and leave empty, green ships are the opposite
    - If there is no cargo at the free berths in the port, green ships queue up for loading, if all free berths in the port are full, red ships queue up for unloading
4. Ships come from the opposite side of the seaport and go, after the work done, to the same place. The type of ship (green or red) is chosen randomly. Frequency of appearance of ships 1 in 8 seconds.
5. The time the ship stays in the port is 5 seconds.
    - After each sprite was added, the basic animation was created.
    - The game logic was made first and the styling was added at the end.

## 💥 Sources
- [PixiJS](https://www.pixijs.com/)
- [Tween JS](https://github.com/tweenjs/tween.js/)
- [TypeScript](https://www.typescriptlang.org/)



## 🈺 Instructions for install and run App

# clone the repo.
git clone https://github.com/Vitalii505/seaport-visualizer-ts-app

# go to the repo
cd seaport-visualizer-ts-app

# install the dependencies via npm
npm install

# build the server in dev mode
npm run build

# start the server in dev mode
npm run start
go to http://localhost:9000
