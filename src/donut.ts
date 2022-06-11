import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Donut extends PIXI.Sprite {
  game: Game;
  alive: boolean = true;
  eatenTexture: PIXI.Texture;

  constructor(game: Game, texture: PIXI.Texture, eatenTexture: PIXI.Texture) {
    super(texture);
    this.eatenTexture = eatenTexture;
    this.game = game;
    this.anchor.set(0.5);
    this.x = Math.random() * 1600; // map size
    this.y = Math.random() * 955; // map size
  }

  update(delta: number) {
    if (this.alive) {
    }
  }

  eaten() {
    this.alive = false;
    this.texture = this.eatenTexture;
  }
}
