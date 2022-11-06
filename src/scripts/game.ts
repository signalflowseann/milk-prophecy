import 'phaser'
import { BootScene, GameScene } from './scenes'
import DialogModalPlugin from './plugins/dialogModal';

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'White Gold',
  render: {
    antialias: false
  },
  type: Phaser.AUTO,
  scene: [BootScene, GameScene],
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT
  },
  parent: 'phaser-game',
  backgroundColor: '#48C4F8',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  },
  plugins: [
    {
      key: 'DialogModalPlugin',
      plugin: DialogModalPlugin,
      start: true
    }
  ]
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig)
})
