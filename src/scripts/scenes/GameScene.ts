import KeyBinding, { KeyMapping } from '../utils/KeyBinding'
import Player from '../gameplay/Player'
import PlayerEntity from '../objects/entity/PlayerEntity'
import DialogModalPlugin from '../plugins/dialogModal'
import Vector2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
  static readonly TILE_WIDTH = 136
  static readonly TILE_HEIGHT = 82

  keys: KeyMapping
  private player: Player

  constructor() {
    super({ active: false, visible: false, key: 'Game' })
  }
  preload() {
    const key = 'DialogModalPlugin'
    this.plugins.install(key, DialogModalPlugin)
    const dialogModal = this.plugins.get(key)

    // TODO: fix type bs
    /* @ts-ignore */
    dialogModal.setText('You have been chosen by the dairy gods to fetch a carton of milk, oh chosen one. The prophecy of old has predicted your coming. Here you are at long last! Go and retrieve the milk carton and the world will be saved from a milkless existence.', true);
  }

  create() {
    const isoMap = this.make.tilemap({ key: 'home-map' })
    for (const imageLayer of isoMap.images) {
      const image = this.add.image(imageLayer.x ?? 0, imageLayer.y ?? 0, imageLayer.name)
      image.setScrollFactor(1, 1)
      image.setDisplayOrigin(0, 0)
    }

    // Player
    this.player = new Player(new PlayerEntity(this), this)
    const offsetX = GameScene.TILE_WIDTH / 2
    const offsetY = GameScene.TILE_HEIGHT

    this.player
      .getEntity()
      .setPosition(new Vector2(7 * GameScene.TILE_WIDTH + offsetX, 5 * GameScene.TILE_HEIGHT + offsetY))

    // Camera
    this.player.makeSubjectOf(this.cameras.main)
    this.cameras.main.roundPixels = true
    this.cameras.main.setZoom(1, 1)

    this.keys = KeyBinding.createMovementKeys(this)
  }

  update() {
    this.handleInput()

    // Do updates
    this.player.update()
  }

  private handleInput() {
    this.player.handleInput()
  }
}
