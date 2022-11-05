import Player from "../objects/player";
import GridControls from "../utils/gridControls";
import GridPhysics from "../utils/gridPhysics";
import { Direction } from "../utils/direction";
import DialogModalPlugin from "../plugins/dialogModal";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export default class MainScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  static readonly TILE_SIZE = 48;
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;

  private createPlayerAnimation(
    name: string,
    startFrame: number,
    endFrame: number
  ) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers("player", {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  preload() {
    const key = 'DialogModalPlugin'
    this.plugins.install(key, DialogModalPlugin)
    const dialogModal = this.plugins.get(key)
    
    // TODO: fix type bs
    /* @ts-ignore */
    dialogModal.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    
    this.load.image("tiles", "assets/img/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud-city.json");
    this.load.spritesheet("player", "assets/img/characters.png", {
        frameWidth: 26,
        frameHeight: 36,
    });
  }

  create() {
    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
    cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap
        .createLayer(i, "Cloud City", 0, 0)
      layer.setDepth(i);
      layer.scale = 3;
    }

    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.setDepth(2);
    playerSprite.scale = 3;
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;
    
    const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6));
    this.gridPhysics = new GridPhysics(player, cloudCityTilemap);
    this.gridControls = new GridControls(
      this.input,
      this.gridPhysics
    );

    this.createPlayerAnimation(Direction.UP, 90, 92);
    this.createPlayerAnimation(Direction.RIGHT, 78, 80);
    this.createPlayerAnimation(Direction.DOWN, 54, 56);
    this.createPlayerAnimation(Direction.LEFT, 66, 68);
  }

  update(_time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
  }
}
