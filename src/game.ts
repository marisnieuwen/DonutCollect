import * as PIXI from "pixi.js";
import { Donut } from "./donut";
import { Player } from "./player";

import playerImage from "./images/characterani.gif";
import donutImage from "./images/donutstack2.png";
import eatenImage from "./images/donutgone.png";
import townImage from "./images/town.png";

export class Game {
  public pixi: PIXI.Application;
  private loader: PIXI.Loader;
  private player: Player;
  private background: PIXI.Sprite;
  private donuts: Donut[] = [];

  constructor() {
    this.pixi = new PIXI.Application({ width: 800, height: 600 });
    document.body.appendChild(this.pixi.view);

    this.loader = new PIXI.Loader();
    this.loader
      .add("playerTexture", playerImage)
      .add("donutTexture", donutImage)
      .add("eatenTexture", eatenImage)
      .add("backgroundTexture", townImage);

    this.loader.load(() => this.doneLoading());
  }

  public doneLoading() {
    this.background = new PIXI.Sprite(
      this.loader.resources["backgroundTexture"].texture!
    );
    this.pixi.stage.addChild(this.background);

    for (let i = 0; i < 10; i++) {
      let donut = new Donut(
        this,
        this.loader.resources["donutTexture"].texture!,
        this.loader.resources["eatenTexture"].texture!
      );
      this.pixi.stage.addChild(donut);
      this.donuts.push(donut);
    }

    this.player = new Player(
      this,
      this.loader.resources["playerTexture"].texture!
    );
    this.pixi.stage.addChild(this.player);

    this.pixi.stage.x = this.pixi.screen.width / 2;
    this.pixi.stage.y = this.pixi.screen.height / 2;

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  private update(delta: number) {
    this.player.update(delta);

    for (let donut of this.donuts) {
      donut.update(delta);

      if (this.collision(donut, this.player)) {
        donut.eaten();
      }
    }
  }

  // For scrolling background, work in progress
//   addBackground() {
//     this.bg = new Background(this.pixi.loader.resources["backgroundTexture"].texture!, this.pixi.screen.width, this.pixi.screen.height)
//     this.pixi.stage.addChild(this.bg)
// }

// updateBg() {
//     this.bg.update()
// }

  private collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}
