import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    const progress = this.add.graphics()
    progress.fillStyle(0xffffff, 1)

    // Register a load progress event to show a load bar
    this.load.on('progress', value => {
      progress.clear()
      progress.fillRect(0, Number(this.sys.game.config.height) - 20, Number(this.sys.game.config.width) * value, 20)
    })

    // Register a load complete event when all files are loaded
    this.load.on('complete', () => {
      this.scene.start('Game')
    })

    // TODO: Change this
    this.load.image('background', 'assets/img/House_Bg-sketch-isometric.jpg')

    this.load.image('elevation', 'assets/tilesets/Elevation.png')
    this.load.tilemapTiledJSON('home-map', 'assets/home.json')

    this.load.spritesheet('player', 'assets/img/base/base_character_sheet.png', {
      frameWidth: 131,
      frameHeight: 261
    })
  }
}
