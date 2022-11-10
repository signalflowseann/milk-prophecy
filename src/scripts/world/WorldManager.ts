import { GameScene } from '../scenes'
import Area from './Area'
import Vector2 = Phaser.Math.Vector2

export default class WorldManager {
  private area: Area | null = null

  constructor(private readonly scene: GameScene) {}

  /**
   * Sets the current area to display in the world
   *
   * @param mapKey    The key of the loaded Tiled JSON Tilemap
   * @param spawnName The name of the spawn
   */
  setArea(mapKey: string, spawnName?: string) {
    this.area = new Area(this.scene, mapKey)
    this.area.initLayers()

    if (spawnName) {
      const spawns = this.area.map
        .getObjectLayer('objects')
        .objects.filter(obj => obj.properties.some(prop => prop.name === 'type' && prop.value === 'spawn'))
      if (!spawns.length) {
        throw new Error('No spawns present')
      }

      const spawn = spawns.find(sp => sp.name === spawnName) ?? spawns[0]
      this.scene.getPlayer().getEntity().setPosition(new Vector2(spawn.x, spawn.y))
    }

    this.scene.getPlayer().setLocation(this.area)
  }
}
