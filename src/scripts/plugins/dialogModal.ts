import Phaser from "phaser";

const DEPTH = 8

export default class DialogModalPlugin extends Phaser.Plugins.BasePlugin {
  scene: Phaser.Scene
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
  text: Phaser.GameObjects.Text
  graphics: Phaser.GameObjects.Graphics
  closeBtn: Phaser.GameObjects.Text
  dialog: string
  timedEvent: Phaser.Time.TimerEvent

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
    this.visible = true;
    this.text;
    this.graphics;
    this.closeBtn;
    this.dialog = '';
    this.timedEvent;
  }

  init () {  
    this._createWindow();
  }

  _getGameWidth(): number {
    const width = this.scene.sys.game.config.width;
    if (typeof width !== "number") return 0
    return width
  }

  _getGameHeight(): number {
    const height = this.scene.sys.game.config.height;
    if (typeof height !== "number") return 0
    return height
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
    this.graphics.fillStyle(0x303030, 1)
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1)
  }

  _createOuterWindow(x, y, rectWidth, rectHeight) {
    this.graphics.lineStyle(this.borderThickness, 0x907748, this.borderAlpha)
    this.graphics.strokeRect(x, y, rectWidth, rectHeight)    
  }

  _createWindow() {
    var gameHeight = this._getGameHeight();
    var gameWidth = this._getGameWidth();
    var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
    if (!this.scene) return
    
    this.graphics = this.scene.add.graphics();

    this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    this._createCloseModalButton();
    this._createCloseModalButtonBorder()

    // Put the dialog box on the top of the screen and have the position fixed (aka. don't move with camera)
    this.graphics.setDepth(DEPTH)
    this.graphics.setScrollFactor(0,0);
  }

  _createCloseModalButton() {
    const textStyle: 	Phaser.Types.GameObjects.Text.TextStyle = {
      font: 'bold 12px Arial',
      color: this.closeBtnColor
    }

    const textConfig: Phaser.Types.GameObjects.Text.TextConfig = {
        x: this._getGameWidth() - this.padding - 14,
        y: this._getGameHeight() - this.windowHeight - this.padding + 3,
        text: 'X',
        style: textStyle
    }

    this.closeBtn = this.scene.make.text(textConfig)
    this.closeBtn.setDepth(20)
    this.closeBtn.setScrollFactor(0,0)
    this.closeBtn.setInteractive();
    this.closeBtn.on('pointerover', () => {
      this.closeBtn.setTint(0xff0000);
    });
    this.closeBtn.on('pointerout', () => {
      this.closeBtn.clearTint();
    });
    this.closeBtn.on('pointerdown', () => {
      this.toggleWindow();
    });
  }

  _createCloseModalButtonBorder () {
    var x = this._getGameWidth() - this.padding - 20;
    var y = this._getGameHeight() - this.windowHeight - this.padding;
    this.graphics.strokeRect(x, y, 20, 20);
  }

  // Hide/Show the dialog window
  toggleWindow() {
    this.visible = !this.visible;
    if (this.text) this.text.visible = this.visible;
    if (this.graphics) this.graphics.visible = this.visible;
    if (this.closeBtn) this.closeBtn.visible = this.visible;
  }

  // Sets the text for the dialog window
  setText(text, animate=false) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.timedEvent.remove();
    var tempText = animate ? '' : text;
    this._setText(tempText);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 30),
        callback: this._animateText,
        callbackScope: this,
        loop: true
      });
    }
  }

  // Slowly displays the text in the window to make it appear annimated
  _animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  }

  // Calcuate the position of the text in the dialog window
  _setText(text) {
    // Reset the dialog
    if (this.text) this.text.destroy();
    var x = this.padding + 10;
    var y = this._getGameHeight() - this.windowHeight - this.padding + 10;
    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
      }
    });

    this.text.setDepth(DEPTH)
    this.text.setScrollFactor(0,0);
  }
}
