import { GameScene } from '../scenes'

export default class Area {
  readonly map: Phaser.Tilemaps.Tilemap
  readonly elevationLayer: Phaser.Tilemaps.TilemapLayer

  constructor(private readonly scene: GameScene, private readonly mapKey: string) {
    this.map = scene.make.tilemap({
      key: mapKey,
      insertNull: true
    })
    const tileset = this.map.addTilesetImage('elevation')

    this.elevationLayer = this.map.createLayer('elevation', tileset, 0, 0)
  }

  initLayers(): void {
    for (const imageLayer of this.map.images) {
      const image = this.scene.add.image(imageLayer.x ?? 0, imageLayer.y ?? 0, imageLayer.name)
      image.setScrollFactor(1, 1)
      image.setOrigin(0, 0)
    }
  }
}
