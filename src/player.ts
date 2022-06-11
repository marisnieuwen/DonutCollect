import * as PIXI from "pixi.js"
import { Rectangle } from "pixi.js"
import { Game } from "./game"

export class Player extends PIXI.Sprite {

    private xspeed = 0
    private yspeed = 0
    private game:Game

    constructor(game:Game, texture: PIXI.Texture) {
        super(texture)

        this.game = game
        this.anchor.set(0.5)
        this.x = game.pixi.screen.width/2
        this.y = game.pixi.screen.height/2

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    } 
        
    update(delta: number) {
        let mapwidth = 1600
        let mapheight = 955
        let centerx = 350
        let centery = 250

        this.x = this.clamp(this.x + this.xspeed, 0, mapwidth)
        this.y = this.clamp(this.y + this.yspeed, 0, mapheight)

        let mapx = this.clamp(this.x, centerx, mapwidth - centerx)
        let mapy = this.clamp(this.y, centery, mapheight - centery)
        this.game.pixi.stage.pivot.set(mapx, mapy)        
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }
    
    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -4
                this.scale.set(1, 1)
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 4
                this.scale.set(-1, 1)
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -4
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 4
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}