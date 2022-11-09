import KeyBinding, { KeyMapping } from '../utils/KeyBinding'
import Player from '../gameplay/Player'
import PlayerEntity from '../objects/entity/PlayerEntity'
import DialogModalPlugin from '../plugins/dialogModal'
import WorldManager from '../world/WorldManager'

export default class GameScene extends Phaser.Scene {
  static readonly TILE_WIDTH = 136
  static readonly TILE_HEIGHT = 82

  keys: KeyMapping
  private player: Player
  private readonly world: WorldManager

  constructor() {
    super({ active: false, visible: false, key: 'Game' })

    this.world = new WorldManager(this)
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
    // Player
    this.player = new Player(new PlayerEntity(this), this)
    if (!this.player.getLocation()) {
      this.world.setArea('home-map', 'Start Spawn')
    }

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

  getPlayer(): Player {
    return this.player
  }

  private handleInput() {
    this.player.handleInput()
  }
}
