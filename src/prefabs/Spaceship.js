// Rocket prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                       // add object to existing scene
        this.points = pointValue;                       // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;  // pixel per frame
        this.dir = 0;                                   // direction: 0 for left, 1 for right
    }

    update() {
        if(this.dir) {
            // move spaceship right
            this.x += this.moveSpeed;
            // wrap around from right edge to left edge
            if (this.x >= game.config.width) {
                this.reset();
            }
        } else {
            // move spaceship left
            this.x -= this.moveSpeed;
            // wrap around from left edge to right edge
            if (this.x <= 0 - this.width) {
                this.reset();
            }
        }
        
    }

    // posistion reset
    reset() {
        this.dir =this.getRandomIntInclusive(0, 1);     // randomly either true or false
        if (this.dir) {
            this.flipX = true;
            this.x = 0;
        } else {
            this.flipX = false;
            this.x = game.config.width;
        }
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
}