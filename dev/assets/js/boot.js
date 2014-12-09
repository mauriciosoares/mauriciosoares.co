document.addEventListener('DOMContentLoaded', function(){
  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
  game.state.add('game', GameState, true);
});
