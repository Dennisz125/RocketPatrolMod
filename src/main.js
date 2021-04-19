/*
Name: Dennis Zabluda
Project Name: Rocket Patrol Mod
Date: 4/14/21
Time took: ~22 hours

I have successfully implemented:
    - Redesign the game's artwork, UI, and sound to change its theme and aesthetic (to something other than sci-fi) (60)
    - Implement a simultaneous two-player mode (30)
    - Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)
    - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
    - Display the time remaining (in seconds) on the screen (10)
    - Increment time when the rocket hits the spaceship (in two-player mode, the success of any player increments time for both) (20)
    - Randomize each spaceship's movement direction at the start of each play (5)
*/

// game config
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT; //p1
let keyW, keyS, keyA, keyD; //p2
let keyDown; //misc