class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/Toungehit.png');
        this.load.image('spaceship', './assets/Dragonfly.png');
        this.load.image('starfield', './assets/Lake.png');

        this.load.image('frog', './assets/Frogv2.png');
        this.load.image('fly', './assets/Fly.png');
        this.load.image('toungebody', './assets/Toungebody.png');
        this.load.image('flyblood', './assets/FlyBlood.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        // add player1 (p1) and player2 (p2) if needed
        if (!game.settings.twoPlayer) {
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize*1.5 - borderPadding, 'rocket').setOrigin(0.5, 0);
        } else {
            this.p1Rocket = new Rocket(this, game.config.width/3*2, game.config.height - borderUISize*1.5 - borderPadding, 'rocket').setOrigin(0.5, 0);
            this.p2Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize*1.5 - borderPadding, 'rocket', 0, 1).setOrigin(0.5, 0);
        }

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        
        // add flys (x1)
        this.fly01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'fly', 0, 50, 3).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize/2, game.config.width, borderUISize/2, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize/2, 0, borderUISize/2, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderPadding*2, borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width/4, borderPadding*2, this.p2Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // display timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 75
        }
        this.timerRight = this.add.text(game.config.width - borderUISize*2 - borderPadding*3, borderPadding*2, this.timer / 1000, timerConfig);

    }

    update() {
        // check key input for restart/menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        //this.starfield.tilePositionX -= starSpeed;
        
        this.updateTimer();  
        if (!this.gameOver) {
            this.p1Rocket.update();
            if(game.settings.twoPlayer) this.p2Rocket.update();
            this.ship01.update();   // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            
            this.fly01.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if(this.checkCollision(this.p1Rocket, this.fly01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.fly01);   
        }

        // if there's a second player, check collisions
        if (game.settings.twoPlayer) {
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01, 1);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02, 1);
            }
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03, 1);   
            }
            if(this.checkCollision(this.p2Rocket, this.fly01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.fly01, 1);   
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, player = 0) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        //let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        //boom.anims.play('explode');             // play explode animation

        var particles = this.add.particles('flyblood');
        var min, max;
        if (ship.dir) {
            min = 0;
            max = 90;
        } else {
            min = 90;
            max = 360;
        }
        var emitter = particles.createEmitter({
            x : ship.x,
            y : ship.y,
            speed: { min: 0, max: 100 },
            angle: { min: min, max: max },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            lifespan: 1000,
            gravityY: 300
        });

        this.time.delayedCall(1000, () => {
            particles.destroy();
            ship.reset();                   // reset ship position
            ship.alpha = 1;                 // make ship visible again
        });
        
        
        /*boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });*/

        // score add and repaint
        if (!player) { //if (player 1)
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        } else {    //else (player 2)
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        
        // add additional time to clock, addition is based on ship's points
        this.clock.delay += 250 * ship.points;

        this.sound.play('sfx_explosion');
      }

      updateTimer() {
        //update timer
        this.timerRight.text = ': ' + Math.ceil((this.clock.delay - this.clock.getElapsed()) / 1000); 
      }
  }