var GameState = function() {

};

GameState.prototype.preload = function() {
  this.game.load.spritesheet('ship', 'assets/images/ship.png', 50, 47);
  this.game.load.image('bullet', 'assets/images/bullet.png');
};

GameState.prototype.create = function() {
  this.game.stage.backgroundColor = 0x000000;

  // setting ship constants
  this.ACCELERATION = 200;
  this.MAX_SPEED = 400;
  this.DRAG = 50;
  this.ROTATION_SPEED = 180;

  this.ship = this.game.add.sprite(200, 200, 'ship');
  this.ship.anchor.setTo(0.5, 0.5);

  this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);

  this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);

  this.ship.body.drag.setTo(this.DRAG, this.DRAG);

  // setting bullet configuration
  this.SHOT_DELAY = 100;
  this.BULLET_SPEED = 500;
  this.NUMBER_OF_BULLETS = 20;

  this.bulletPool = this.game.add.group();
  for(var i = 0; i < this.NUMBER_OF_BULLETS; i += 1) {
    var bullet = this.game.add.sprite(0, 0, 'bullet');
    this.bulletPool.add(bullet);

    bullet.anchor.setTo(- 1, 0.5);

    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

    bullet.kill();
  }

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);
};

GameState.prototype.update = function() {
  this.moveShip();
  this.outOfBounds();

  if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.shootBullet();
};

GameState.prototype.outOfBounds = function() {
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

GameState.prototype.shootBullet = function() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    var bullet = this.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(this.ship.x, this.ship.y);
    bullet.rotation = this.ship.rotation;

    // Shoot it in the right direction
    bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
    bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
};
