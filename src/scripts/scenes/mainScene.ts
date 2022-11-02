const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export default class MainScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig)
  }

  preload() {
    this.load.image("tiles", "assets/img/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud-city.json");
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
  }
}
