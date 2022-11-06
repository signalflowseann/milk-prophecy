import Entity from './Entity'
import { GameScene } from '../../scenes'
import Direction from './Direction'
import GID from '../../utils/GID'

export default class PlayerEntity extends Entity {
  private circle: Phaser.GameObjects.Arc

  constructor(scene: GameScene) {
    super(scene.add.sprite(0, 0, 'player'), GID.PLAYER, scene)

    const sprite = this.getSprite()
    sprite.setDepth(2)
    sprite.scale = 0.9
    sprite.setOrigin(0.5, 0.9)
    sprite.setFrame(0)

    // TODO: Remove
    this.circle = scene.add.circle(sprite.x, sprite.y, 2, 0xff0000)
    this.circle.setDepth(3)

    this.initAnimations()
  }

  update() {
    super.update()

    this.circle.setPosition(this.getSprite().x, this.getSprite().y)
  }

  private initAnimations(): void {
    this.createPlayerAnimation(Direction.DOWN, 0, 2)
    this.createPlayerAnimation(Direction.RIGHT, 3, 5)
    this.createPlayerAnimation(Direction.LEFT, 6, 8)
    this.createPlayerAnimation(Direction.UP, 9, 11)
  }

  private createPlayerAnimation(name: Direction, startFrame: number, endFrame: number) {
    this.scene.anims.create({
      key: name,
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: startFrame,
        end: endFrame
      }),
      frameRate: 8,
      repeat: -1,
      yoyo: true
    })
  }
}
