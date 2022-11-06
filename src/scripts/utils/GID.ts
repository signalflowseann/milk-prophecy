/**
 * Tracks the used GIDs in the current area. Only used for entities that are not important to dialog
 * or the story.
 */
export default class GID {
  static readonly PLAYER = 0

  /**
   * The first GID to use for non-important entities
   */
  private static readonly STARTING_GID = 257

  private static nextEphemeralGid = GID.STARTING_GID

  private constructor() {}

  /**
   * Gets the next unused GID and increments the next available
   *
   * @return An unused GID
   */
  static getNextGid(): number {
    return this.nextEphemeralGid++
  }

  /**
   * Restarts the ephemeral GID numbering to the initial value
   */
  static restartNumbering(): void {
    this.nextEphemeralGid = GID.STARTING_GID
  }
}
