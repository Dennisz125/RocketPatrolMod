// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playerNumber = 0) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                       // add object to existing scene
        this.isFiring = false;                          // track Rocket's firing status
        this.moveSpeed = 2;                             // pixel per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.playerNumber = playerNumber;               // player number; 0 is player 1, 1 is player 2

        this.tounge = scene.add.tileSprite(x - 5, y, 9, 9, 'toungebody').setOrigin(0, 0);
        this.avatar = scene.add.tileSprite(x - 53, y - 20, 100, 100, 'frog').setOrigin(0, 0);  // add player's avatar
    }
    update() {
        switch(this.playerNumber) {
            case 0:
                this.p1controls();
                break;
            case 1:
                this.p2controls();
                break;
            default:
                console.log('ERROR @ Rocket.js; playerNumber is ' + this.playerNumber);
        }       
    }

    // player 1's controls
    p1controls() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= this.width/2) {
                this.x -= this.moveSpeed;
                this.avatar.x -= this.moveSpeed;
                this.tounge.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - this.width / 2) {
                this.x += this.moveSpeed;
                this.avatar.x += this.moveSpeed;
                this.tounge.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
            this.tounge.scaleY -= this.moveSpeed/9;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // player 2's controls
    p2controls() {
        // left/right movement
        if(!this.isFiring) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
                this.avatar.x -= this.moveSpeed;
                this.tounge.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
                this.avatar.x += this.moveSpeed;
                this.tounge.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize*2 + 4;
        this.tounge.scaleY = 1;
    }
  }