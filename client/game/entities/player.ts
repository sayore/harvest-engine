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
import { Body, Circle, Polygon, Result } from "detect-collisions";
import * as PIXI from 'pixi.js'
import { Container, Graphics, RenderTexture, Sprite, TilingSprite } from "pixi.js";
import { Vector } from "../../../lib/types/vector";
import { EventTypesAvailable, InputHandler } from "../input";
import { OwnerKnowingBody } from "../../../lib/types/ownerKnowingBody";

export class Player extends Entity implements IDrawable, ICollisionable {
    private packageRegistry: PacketRegistry;
    UniqueIdentifier: any;

    Type = "Player";
    Position = new Vector(20, 10);
    PhisicalVector = new Vector(0, 0);
    PressedKeys: Set<string> = new Set();
    CollisionBox: Circle;
    MySprite: TilingSprite;
    MyRenderedSprite: Sprite;
    MyTexture: RenderTexture;
    MyGraphics: Graphics;
    myKeyUpEventId: number;
    myKeyDownEventId: number;
    myVisibilityChangedEventId: number;

    constructor(

    ) {
        super();
        
    }
    collided(result:Result): void {
        this.Position.x -= result.overlap/2 * result.overlap_x;
		this.Position.y -= result.overlap/2 * result.overlap_y;

        result.b.owner.x += result.overlap/2 * result.overlap_x;
		result.b.owner.y += result.overlap/2 * result.overlap_y;
    }
    getColliders(): Body[] {
        this.CollisionBox.x = this.Position.x;
        this.CollisionBox.y = this.Position.y;
        return [this.CollisionBox]
    }
    canMove(): boolean {
        return true;
    }

    initialize() {
        this.CollisionBox = this.game.CollisionSystem.createCircle(this.Position.x, this.Position.y, 32)
        this.CollisionBox.owner = this;

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
        this.MySprite = new TilingSprite(this.game.loader.resources["player"].texture, 64, 64);
        this.MySprite.tilePosition.x = 0
        this.MyGraphics.addChild(this.MySprite);
        //this.MyTexture = this.game.renderer.generateTexture(this.MyGraphics);
        //this.MyRenderedSprite = new Sprite(this.MyTexture);
        //this.game.stage.addChild(this.MyRenderedSprite);

        this.game.stage.addChild(this.MyGraphics);
        console.log("Added Sprite to Stage.")

        var ih = this.game.getEntity<InputHandler>("InputHandler");
        this.myVisibilityChangedEventId = ih.Events.get(EventTypesAvailable.VisibilityChanged).addListener(() => {
            console.log("Vis changed!!");
            this.PressedKeys.clear();
        });
        this.myKeyDownEventId = ih.Events.get(EventTypesAvailable.KeyDown).addListener((event: KeyboardEvent) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case "Down": // IE/Edge specific value
                case "ArrowDown":
                case "s":
                    this.PressedKeys.add("Down");
                    this.MySprite.tilePosition.y = -64
                    // Do something for "down arrow" key press.
                    break;
                case "Up": // IE/Edge specific value
                case "ArrowUp":
                case "w":
                    this.PressedKeys.add("Up");
                    this.MySprite.tilePosition.y = 0
                    // Do something for "up arrow" key press.
                    break;
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                case "a":
                    this.PressedKeys.add("Left");
                    this.MySprite.tilePosition.y = -128
                    // Do something for "left arrow" key press.
                    break;
                case "Right": // IE/Edge specific value
                case "ArrowRight":
                case "d":
                    this.PressedKeys.add("Right");
                    this.MySprite.tilePosition.y = -128 - 64
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
        });

        this.myKeyUpEventId = ih.Events.get(EventTypesAvailable.KeyUp).addListener((event: KeyboardEvent) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }
            console.log(event.key);
            switch (event.key) {
                case "Down": // IE/Edge specific value
                case "ArrowDown":
                case "s":
                    this.PressedKeys.delete("Down");
                    // Do something for "down arrow" key press.
                    break;
                case "Up": // IE/Edge specific value
                case "ArrowUp":
                case "w":
                    this.PressedKeys.delete("Up");
                    // Do something for "up arrow" key press.
                    break;
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                case "a":
                    this.PressedKeys.delete("Left");
                    // Do something for "left arrow" key press.
                    break;
                case "Right": // IE/Edge specific value
                case "ArrowRight":
                case "d":
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
        });
    }

    

    LastCameraPositions : Vector[] = [];
    MedianCameraPos = new Vector(0,0);
    PollingRate = 1000;
    PollingState = 0;
    update() {
        let anypressed = false;
        if (this.PressedKeys.has("Down")) { this.PhisicalVector.y += 23 * Math.random(); anypressed = true; }
        if (this.PressedKeys.has("Up")) { this.PhisicalVector.y -= 23 * Math.random(); anypressed = true; }
        if (this.PressedKeys.has("Left")) { this.PhisicalVector.x -= 25 * Math.random(); anypressed = true; }
        if (this.PressedKeys.has("Right")) { this.PhisicalVector.x += 25 * Math.random(); anypressed = true; }

        if(!document.hasFocus())
        { 
            this.PressedKeys.clear();
            this.PhisicalVector.mulNumber(0.75);
        }
        this.Position.add(Vector.mulNumber(this.PhisicalVector, 0.1));
        this.PhisicalVector.mulNumber(0.93); //

        if (!anypressed) {
            this.PhisicalVector.mulNumber(0.75);
        }


        this.PollingState++;
        if (this.PollingState == this.PollingRate) {
            this.PollingState = 0;
            socket.emit("04", { uuid: this.UniqueIdentifier, position: this.Position })
        }


        this.MyGraphics.setTransform(this.Position.x, this.Position.y)
        
        if(this.LastCameraPositions.length>20) this.LastCameraPositions.shift();
        this.LastCameraPositions.push(new Vector(
            -this.Position.x + this.game.renderer.width / 2 - this.MySprite.width / 2,
            -this.Position.y + this.game.renderer.height / 2 - this.MySprite.height / 2
        ))
        if(this.LastCameraPositions.length>2)
        {this.MedianCameraPos = this.LastCameraPositions.reduce((a,b)=>{return a.add(b)});
        this.game.stage.x = this.MedianCameraPos.x/this.LastCameraPositions.length;
        this.game.stage.y = this.MedianCameraPos.y/this.LastCameraPositions.length;}

        //if(this.Position.x<=0) this.remove();
    }

    draw() {

    }

    unload() {
        var ih = this.game.getEntity<InputHandler>("InputHandler");
        ih.Events.get(EventTypesAvailable.KeyDown).removeListener(this.myKeyDownEventId);
        ih.Events.get(EventTypesAvailable.KeyUp).removeListener(this.myKeyUpEventId);
        ih.Events.get(EventTypesAvailable.VisibilityChanged).removeListener(this.myVisibilityChangedEventId);

        this.game.stage.removeChild(this.MyGraphics);
    }
}