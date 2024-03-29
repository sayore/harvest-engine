import { RegisterPacket } from "../../packets/00_register";
import { ChatResetPacket } from "../../packets/06b_reset";
import { ChatPacket } from "../../packets/01_chat";
import { PacketRegistry } from "../../packets/packet_registry";
import { ChatBroadcastPacket } from "../../packets/01b_chatbroadcast";
import { ClientEntity } from "../ClientEntity";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { socket } from "../..";
import { ICollisionable } from "../../../lib/interface/ICollisionable";
import { Body, Circle, Polygon, Result } from "detect-collisions";
import * as PIXI from 'pixi.js'
import { Graphics, RenderTexture, Sprite, TilingSprite } from "pixi.js";
import { Vector } from "../../../lib/types/Vector";
import { EventTypesAvailable, InputHandler } from "../InputHandler";
import { PlayerPosition } from "../../../lib/packets/PlayerPositionUpdate";
import { MovePacket } from "../../packets/04b_move";
import { UUIDPacket } from "../../packets/08_uuid";
import { ChunkCallBackPaket as ChunkCallbackPaket } from "../../packets/09cb_chunk";
import { ConsolePaket } from "../../packets/10_console";

export class Player extends ClientEntity implements IDrawable, ICollisionable {
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

    collided(result: Result): void {
        if (result.b.owner.canMove()) {
            this.Position.x -= result.overlap / 2 * result.overlap_x;
            this.Position.y -= result.overlap / 2 * result.overlap_y;

            result.b.owner.x += result.overlap / 2 * result.overlap_x;
            result.b.owner.y += result.overlap / 2 * result.overlap_y;

            // Trying to fix some of the bouncyness
            this.PhisicalVector.negate().sub(new Vector(result.overlap_x,result.overlap_y).mulNumber(0.7));
        } else {
            this.Position.x -= result.overlap * result.overlap_x;
            this.Position.y -= result.overlap * result.overlap_y;

            this.PhisicalVector.x=0;
            this.PhisicalVector.y=0;
        }
        //this.game.handleCollisions();
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
        this.CollisionBox = this.Game.CollisionSystem.createCircle(this.Position.x, this.Position.y, 32)
        this.CollisionBox.owner = this;

        this.packageRegistry = new PacketRegistry();
        this.packageRegistry.game = this.Game;
        this.packageRegistry.socket = this.Game.Socket;
        this.packageRegistry.register("00", new RegisterPacket());
        this.packageRegistry.register("01", new ChatPacket());
        this.packageRegistry.register("01b", new ChatBroadcastPacket());
        this.packageRegistry.register("04b", new MovePacket());
        this.packageRegistry.register("06b", new ChatResetPacket());
        this.packageRegistry.register("08", new UUIDPacket());
        this.packageRegistry.register("09cb", new ChunkCallbackPaket());
        this.packageRegistry.register("10", new ConsolePaket());

        this.packageRegistry.packetsRegistred.forEach(packet => {
            this.Game.Socket.on(packet[0], (args) => { /*console.log("REIC " + packet[0]);*/ packet[1].handle(args); });
        });
        setTimeout(() => {
            this.Game.Socket.emit("00");
            this.Game.Socket.emit("03");
        }, 1000)

        this.MyGraphics = new PIXI.Graphics();
        this.MySprite = new TilingSprite(this.Game.Loader.resources["player"].texture, 64, 64);
        this.MySprite.tilePosition.x = 0
        this.MyGraphics.addChild(this.MySprite);
        //this.MyTexture = this.game.renderer.generateTexture(this.MyGraphics);
        //this.MyRenderedSprite = new Sprite(this.MyTexture);
        //this.game.stage.addChild(this.MyRenderedSprite);

        this.Game.stage.addChild(this.MyGraphics);
        console.log("Added Sprite to Stage.")

        var ih = this.Game.getEntity<InputHandler>("InputHandler");
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
            //console.log(event.key);
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



    LastCameraPositions: Vector[] = [];
    MedianCameraPos = new Vector(0, 0);
    PollingRate = 5;
    PollingState = 0;
    update() {
        this.PollingState++;
        let anypressed = false;
        if (this.PressedKeys.has("Down")) { this.PhisicalVector.y += 12 ; anypressed = true; }
        if (this.PressedKeys.has("Up")) { this.PhisicalVector.y -= 12   ; anypressed = true; }
        if (this.PressedKeys.has("Left")) { this.PhisicalVector.x -= 14 ; anypressed = true; }
        if (this.PressedKeys.has("Right")) { this.PhisicalVector.x += 14; anypressed = true; }

        if (!document.hasFocus()) {
            this.PressedKeys.clear();
            this.PhisicalVector.mulNumber(0.75);
        }
        if(this.PhisicalVector.length()>35)
        this.Position.add(this.PhisicalVector.clone().normalize().mulNumber(6));
        this.PhisicalVector.mulNumber(0.95); //

        if (!anypressed) {
            this.PhisicalVector.mulNumber(0.75);
        }


        this.PollingState++;
        if (this.PollingState % this.PollingRate==0) {
            //socket.emit("04", { uuid: this.UniqueIdentifier, position: this.Position })
            if(localStorage.getItem('uuid')!=undefined) {
                this.Game.Socket.emit("04", new PlayerPosition(localStorage.getItem('uuid'), this.Position.clone()))
            }
            else {
                // Rerequest the UUID in case uuid packet was too slow.
                this.Game.Socket.emit("08")
            }
            
        }


        this.MyGraphics.setTransform(this.Position.x, this.Position.y)

        // Update Camera
        //return;
        if (this.LastCameraPositions.length > 20) this.LastCameraPositions.shift();
        this.LastCameraPositions.push(new Vector(
            -this.Position.x + this.Game.renderer.width / 2 - this.MySprite.width / 2,
            -this.Position.y + this.Game.renderer.height / 2 - this.MySprite.height / 2
        ))
        if (this.LastCameraPositions.length > 2) {
            this.MedianCameraPos = this.LastCameraPositions.reduce((a, b) => { return a.add(b) });
            this.Game.stage.x = this.MedianCameraPos.x / this.LastCameraPositions.length;
            this.Game.stage.y = this.MedianCameraPos.y / this.LastCameraPositions.length;
            this.Game.map.x = this.MedianCameraPos.x / this.LastCameraPositions.length;
            this.Game.map.y = this.MedianCameraPos.y / this.LastCameraPositions.length;
        }
    }

    unload() {
        var ih = this.Game.getEntity<InputHandler>("InputHandler");
        ih.Events.get(EventTypesAvailable.KeyDown).removeListener(this.myKeyDownEventId);
        ih.Events.get(EventTypesAvailable.KeyUp).removeListener(this.myKeyUpEventId);
        ih.Events.get(EventTypesAvailable.VisibilityChanged).removeListener(this.myVisibilityChangedEventId);

        this.Game.stage.removeChild(this.MyGraphics);
    }
}