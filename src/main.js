/*
Name: Dennis Zabluda
Project Name: Rocket Patrol Mod
Date: 4/14/21
Duration: Unkown
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