var GameState = function() {

};

GameState.prototype.preload = function() {
  this.game.load.spritesheet('ship', 'assets/images/ship.png', 50, 47);
};

GameState.prototype.create = function() {
  this.game.stage.backgroundColor = 0x000000;

  // setting constants
  this.ACCELERATION = 200;
  this.MAX_SPEED = 400;
  this.DRAG = 50;
  this.ROTATION_SPEED = 180;

  this.ship = this.game.add.sprite(32, 32, 'ship');
  this.ship.anchor.setTo(0.5, 0.5);

  this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);

  this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);

  this.ship.body.drag.setTo(this.DRAG, this.DRAG);

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);
};

GameState.prototype.update = function() {
  this.moveShip();
  this.outOfBonds();
};

GameState.prototype.outOfBonds = function() {
  if(this.ship.x > this.game.width) this.ship.x = 0;
  if(this.ship.x < 0) this.ship.x = this.game.width;
  if(this.ship.y > this.game.height) this.ship.y = 0;
  if(this.ship.y < 0) this.ship.y = this.game.height;
};

GameState.prototype.moveShip = function() {
  if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.ship.body.angularVelocity = -this.ROTATION_SPEED;
  } else if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    this.ship.body.angularVelocity = this.ROTATION_SPEED;
  } else{
    this.ship.body.angularVelocity = 0;
  }

  if(this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    this.ship.body.acceleration.x = Math.cos(this.ship.rotation) * this.ACCELERATION;
    this.ship.body.acceleration.y = Math.sin(this.ship.rotation) * this.ACCELERATION;

    this.ship.frame = 1;
  } else {
    this.ship.body.acceleration.setTo(0, 0);

    this.ship.frame = 0;
  }
};
