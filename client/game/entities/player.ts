import { Socket } from "socket.io-client";
import { RegisterPacket } from "../../packets/00_register";
import { ChatResetPacket } from "../../packets/06b_reset";
import { ChatPacket } from "../../packets/01_chat";
import { PacketRegistry } from "../../packets/packet_registry";
import { ChatBroadcastPacket } from "../../packets/01b_chatbroadcast";
import { Entity } from "../entity";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { socket } from "../..";
import { ICollisionable } from "../../../lib/interface/ICollisionable";
import { Body, Polygon } from "detect-collisions";
import * as PIXI from 'pixi.js'
import { Container, Graphics, Sprite } from "pixi.js";

export class Player extends Entity implements IDrawable, ICollisionable {
    private packageRegistry: PacketRegistry;
    UniqueIdentifier: any;

    Type = "Player";
    Position: [x: number, y: number] = [20, 10];
    PhisicalVector: [x: number, y: number] = [0, 0];
    PressedKeys: Set<string> = new Set();
    CollisionBox : Polygon;
    MySprite:Sprite;
    MyGraphics:Graphics;

    constructor(

    ) {
        super();
        this.CollisionBox = new Polygon(this.Position[0],this.Position[1], [
            [this.Position[0],this.Position[1]],
            [this.Position[0]+50,this.Position[1]],
            [this.Position[0]+50,this.Position[1]+50],
            [this.Position[0],this.Position[1]+50]
        ])
    }
    getColliders(): Body[] {
        this.CollisionBox.x = this.Position[0];
        this.CollisionBox.y = this.Position[0];
        return [this.CollisionBox]
    }
    canMove(): boolean {
        return true;
    }

    initialize() {
        this.packageRegistry = new PacketRegistry();
        this.packageRegistry.game = this.game;
        this.packageRegistry.socket = this.game.socket;
        this.packageRegistry.register("00", new RegisterPacket());
        this.packageRegistry.register("01", new ChatPacket());
        this.packageRegistry.register("01b", new ChatBroadcastPacket());
        this.packageRegistry.register("06b", new ChatResetPacket());

        this.packageRegistry.packetsRegistred.forEach(packet => {
            this.game.socket.on(packet[0], (args) => { console.log("REIC " + packet[0]); packet[1].handle(args); });
        });
        setTimeout(() => {
            this.game.socket.emit("00");
            this.game.socket.emit("03");
        }, 1000)

        this.MyGraphics = new PIXI.Graphics();
        this.MySprite = PIXI.Sprite.from("sprite/RPGpack_sheet.png",{anisotropicLevel:0});
        
        //this.MySprite.scale = new PIXI.ObservablePoint(null,0.5,0.5);
        //this.MySprite.roundPixels=true;
        
        this.MySprite.mask = new PIXI.Graphics();
        (<Graphics>this.MySprite.mask).beginFill(0x000000);
        (<Graphics>this.MySprite.mask).drawRect(this.Position[0],this.Position[1],100,100);
        (<Graphics>this.MySprite.mask).endFill();
        console.log("Fuyio")

        //this.MyContainer.addChild(this.MySprite)

        this.MyGraphics.addChild(this.MySprite);
        this.game.stage.addChild(this.MyGraphics);
        console.log("Added Sprite to Stage.")

        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case "Down": // IE/Edge specific value
                case "ArrowDown":
                    this.PressedKeys.add("Down");
                    // Do something for "down arrow" key press.
                    break;
                case "Up": // IE/Edge specific value
                case "ArrowUp":
                    this.PressedKeys.add("Up");
                    // Do something for "up arrow" key press.
                    break;
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                    this.PressedKeys.add("Left");
                    // Do something for "left arrow" key press.
                    break;
                case "Right": // IE/Edge specific value
                case "ArrowRight":
                    this.PressedKeys.add("Right");
                    // Do something for "right arrow" key press.
                    break;
                case "Enter":
                    // Do something for "enter" or "return" key press.
                    break;
                case "Esc": // IE/Edge specific value
                case "Escape":
                    // Do something for "esc" key press.
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }



            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        }, true);

        window.addEventListener("keyup", (event: KeyboardEvent) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case "Down": // IE/Edge specific value
                case "ArrowDown":
                    this.PressedKeys.delete("Down");
                    // Do something for "down arrow" key press.
                    break;
                case "Up": // IE/Edge specific value
                case "ArrowUp":
                    this.PressedKeys.delete("Up");
                    // Do something for "up arrow" key press.
                    break;
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                    this.PressedKeys.delete("Left");
                    // Do something for "left arrow" key press.
                    break;
                case "Right": // IE/Edge specific value
                case "ArrowRight":
                    this.PressedKeys.delete("Right");
                    // Do something for "right arrow" key press.
                    break;
                case "Enter":
                    // Do something for "enter" or "return" key press.
                    break;
                case "Esc": // IE/Edge specific value
                case "Escape":
                    // Do something for "esc" key press.
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }



            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        }, true);
    }

    PollingRate = 1000;
    PollingState = 0;
    update() {
        let anypressed=false;
        if (this.PressedKeys.has("Down")) { this.PhisicalVector[1] += 30*Math.random(); anypressed = true;}
        if (this.PressedKeys.has("Up")) { this.PhisicalVector[1] -= 30*Math.random(); anypressed = true;}
        if (this.PressedKeys.has("Left")) { this.PhisicalVector[0] -= 30*Math.random(); anypressed = true;}
        if (this.PressedKeys.has("Right")) { this.PhisicalVector[0] += 30*Math.random(); anypressed = true;}
        
        this.Position[0] += this.PhisicalVector[0] * 0.1;
        this.Position[1] += this.PhisicalVector[1] * 0.1;

        this.PhisicalVector[0] *= 0.93;
        this.PhisicalVector[1] *= 0.93
        if(!anypressed) {
            this.PhisicalVector[0] *= 0.75;
            this.PhisicalVector[1] *= 0.75;
        }
        

        this.PollingState++;
        if(this.PollingState == this.PollingRate) {
            this.PollingState = 0;
            socket.emit("04",{uuid:this.UniqueIdentifier,position:this.Position})
        }

        (<Graphics>this.MySprite.mask).clear();
        (<Graphics>this.MySprite.mask).beginFill(0x000000);
        (<Graphics>this.MySprite.mask).drawRect(this.Position[0],this.Position[1],100,100);
        (<Graphics>this.MySprite.mask).endFill();
        this.MyGraphics.setTransform(this.Position[0],this.Position[1])
    }

    draw() {
        
    }
}