/**
 * Collection of common key bindings to use in the game
 */
const BINDINGS = {
  LEFT: Phaser.Input.Keyboard.KeyCodes.A,
  RIGHT: Phaser.Input.Keyboard.KeyCodes.D,
  UP: Phaser.Input.Keyboard.KeyCodes.W,
  DOWN: Phaser.Input.Keyboard.KeyCodes.S,
  INTERACT: Phaser.Input.Keyboard.KeyCodes.E,
  SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
}

/**
 * The KeyBinding utility class provides a convenient way to create key bindings for a scene
 */
export default class KeyBinding {
  /**
   * Creates a keys object based on the given bindings. This also adds the given bindings to the given
   * scene. Helpful for defining only certain keys based on the scene
   * @param scene The current scene
   * @param bindings An array of key bindings to use
   */
  static createKeys(scene: Phaser.Scene, bindings: string[]): { [key: string]: Phaser.Input.Keyboard.Key } {
    const keys: { [key: string]: Phaser.Input.Keyboard.Key } = {};
    bindings.forEach((binding) => {
      keys[binding] = scene.input.keyboard.addKey(BINDINGS[binding.toUpperCase()]);
    })
    return keys;
  }
}