class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/Flydeath.mp3');
        this.load.audio('sfx_rocket', './assets/slirp.mp3');
    }

    create() {
      // menu text configuration
      let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#000000',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Pondemics', menuConfig).setOrigin(0.5);
        menuConfig.color = '#843605';
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2.5, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press D for two player mode:', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 

        // add boolen val
        this.isTwoPlayer = false;
        menuConfig.backgroundColor = '#F3B141';
        menuConfig.color = '#843605';
        this.twoPlayerBoolText = this.add.text(game.config.width/7*6, game.config.height/2 + borderUISize*2 + borderPadding*2, this.isTwoPlayer.toString(), menuConfig).setOrigin(0.5);
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            twoPlayer: this.isTwoPlayer    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            twoPlayer: this.isTwoPlayer   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDown)) {
          if (this.isTwoPlayer) {
            this.isTwoPlayer = false;
          } else {
            this.isTwoPlayer = true;
          }
          this.twoPlayerBoolText.text = this.isTwoPlayer.toString();
        }
      }
  }