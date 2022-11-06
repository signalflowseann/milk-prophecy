/**
 * A wrapper class to handle all gameplay interactions related to the player
 */
import Entity from '../objects/entity/Entity'
import { GameScene } from '../scenes'
import Camera = Phaser.Cameras.Scene2D.Camera

export default class Player {
  private entity: Entity
  private scene: GameScene

  constructor(entity: Entity, scene: GameScene) {
    this.entity = entity
    this.scene = scene
  }

  handleInput(): void {
    // TODO: Logic state controllers

    // Entity movement
    this.entity.move(
      this.scene.keys.up.isDown,
      this.scene.keys.right.isDown,
      this.scene.keys.down.isDown,
      this.scene.keys.left.isDown
    )
  }

  update(): void {
    // TODO: move into "world"?
    this.entity.update()
  }

  makeSubjectOf(camera: Camera): void {
    camera.startFollow(this.entity.getSprite())
  }

  getEntity(): Entity {
    return this.entity
  }
}
