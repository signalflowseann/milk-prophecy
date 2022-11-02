import 'phaser'
import MainScene from './scenes/mainScene'

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'White Gold',
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: MainScene,
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  parent: "phaser-game",
  backgroundColor: "#48C4F8",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // Top down game, so no gravity
    }
  }
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig)
})
