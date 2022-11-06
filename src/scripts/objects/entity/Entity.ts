import { GameScene } from '../../scenes'
import Direction from './Direction'
import Vector2 = Phaser.Math.Vector2

export default abstract class Entity {
  /** The global ID of the entity, unique per instance */
  public readonly gid

  private speed = 0.03
  private motion = Direction.NONE
  private movementAllowed = true

  /** A sequence of directions to keep clean movement */
  private dirSeq: Array<Direction> = []

  protected constructor(private sprite: Phaser.GameObjects.Sprite, gid: number, protected readonly scene: GameScene) {
    this.gid = gid
  }

  update() {
    if (this.isMoving()) {
      let delta = new Vector2(0, 0)

      if (this.motion === Direction.DOWN) {
        delta.set(-1, 1)
      } else if (this.motion === Direction.UP) {
        delta.set(1, -1)
      } else if (this.motion === Direction.LEFT) {
        delta.set(-1, -1)
      } else if (this.motion === Direction.RIGHT) {
        delta.set(1, 1)
      }

      this.setPosition(
        this.position.add(new Vector2(GameScene.TILE_WIDTH, GameScene.TILE_HEIGHT).scale(this.speed).multiply(delta))
      )
    }
  }

  /**
   * Moves the entity based on which of the following directions are enabled for movement. This method uses a sequence to
   * control which direction should be assign to {@link motion}
   * @param up Whether the up direction is enabled
   * @param right Whether the right direction is enabled
   * @param down Whether the down direction is enabled
   * @param left Whether the left direction is enabled
   */
  move(up: boolean, right: boolean, down: boolean, left: boolean): void {
    if (!this.movementAllowed || (!up && !right && !down && !left)) {
      if (this.motion !== Direction.NONE) {
        this.stopMoving()
      }
      this.dirSeq = [] // clear
      return
    }

    this.updateDirSequence(up, Direction.UP)
    this.updateDirSequence(right, Direction.RIGHT)
    this.updateDirSequence(down, Direction.DOWN)
    this.updateDirSequence(left, Direction.LEFT)

    if (this.dirSeq.length > 0) {
      const [lastSeqDir] = this.dirSeq.slice(-1)

      if (lastSeqDir !== this.motion) {
        this.startMoving(lastSeqDir)
      }
    }
  }

  get position(): Vector2 {
    return new Vector2(this.sprite.x, this.sprite.y)
  }

  setPosition(pos: Vector2): void {
    this.sprite.setPosition(pos.x, pos.y)
  }

  setMotion(motion: Direction): void {
    this.motion = motion
  }

  isMoving(): boolean {
    return this.motion !== Direction.NONE
  }

  getSprite() {
    return this.sprite
  }

  private startMoving(dir: Direction): void {
    this.startAnimation(dir)
    this.setMotion(dir)
  }

  private stopMoving(): void {
    this.stopAnimation(this.motion)
    this.setMotion(Direction.NONE)
  }

  private startAnimation(dir: Direction): void {
    this.sprite.anims.play(dir)
  }

  private stopAnimation(dir: Direction): void {
    this.sprite.anims.stop()

    const { frames } = this.sprite.anims.animationManager.get(dir)
    if (frames.length > 1) {
      this.sprite.setFrame(frames[1].frame.name)
    }
  }

  private updateDirSequence(isPressed: boolean, dir: Direction) {
    // Remove from sequence if not pressed
    if (!isPressed) {
      this.dirSeq = this.dirSeq.filter(d => dir !== d)
      return
    }

    // If the player is already moving the direction or the sequence includes the direction, ignore movement
    if (this.motion === dir || this.dirSeq.includes(dir)) {
      return
    }

    this.dirSeq.push(dir)
  }
}
