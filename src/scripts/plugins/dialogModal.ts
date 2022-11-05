// import Pha{ Scene } from "phaser";
import Phaser from "phaser";

export default class DialogModalPlugin extends Phaser.Plugins.BasePlugin {
  scene: Phaser.Scene | undefined
  systems: Phaser.Scenes.Systems
  borderThickness: number
  borderColor: Phaser.Display.Color
  borderAlpha: number
  windowAlpha: number
  windowColor: Phaser.Display.Color
  windowHeight: number
  padding: number
  closeBtnColor: string
  dialogSpeed: number
  eventCounter: number
  visible: boolean
  text: string
  graphics: Phaser.GameObjects.Graphics


  constructor (pluginManager) {
    super(pluginManager);
    this.scene = this.game.scene.keys.Game 
    this.systems = this.scene.sys
    this.borderThickness = 3;
    this.borderColor = Phaser.Display.Color.ValueToColor(0x907748);
    this.borderAlpha = 1;
    this.windowAlpha = 0.8;
    this.windowColor = Phaser.Display.Color.ValueToColor(0x303030); 
    this.windowHeight = 150;
    this.padding = 32;
    this.closeBtnColor = 'darkgoldenrod';
    this.dialogSpeed = 3;
    this.eventCounter = 0;
    // if the dialog window is shown
    this.visible = true;
    this.text;
    this.graphics;
  }

  init () {  
    this._createWindow();
  }

  _getGameWidth() {
    return this.scene?.sys.game.config.width;
  }
  // Gets the height of the game (based on the scene)
  _getGameHeight() {
    return this.scene?.sys.game.config.height;
  }

  _calculateWindowDimensions(width, height) {
    var x = this.padding;
    var y = height - this.windowHeight - this.padding;
    var rectWidth = width - (this.padding * 2);
    var rectHeight = this.windowHeight;
    return {
      x,
      y,
      rectWidth,
      rectHeight
    };
  }

  _createInnerWindow(x, y, rectWidth, rectHeight) {
    this.graphics.fillStyle(0x303030, 1).setDepth(5);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1).setDepth(5).setScrollFactor(0,0);
  }

  _createOuterWindow(x, y, rectWidth, rectHeight) {
    this.graphics.lineStyle(this.borderThickness, 0x907748, this.borderAlpha).setDepth(5);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight).setDepth(5);
  }

  _createWindow() {
    var gameHeight = this._getGameHeight();
    var gameWidth = this._getGameWidth();
    var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
    if (!this.scene) return
    
    this.graphics = this.scene.add.graphics();
    this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
  }
}
