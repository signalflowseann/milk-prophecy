import 'phaser'
import MainScene from './scenes/mainScene'

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 528;

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: MainScene,
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  backgroundColor: "#48C4F8",
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig)
})
