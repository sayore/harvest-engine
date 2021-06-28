import { Graphics, InteractionEvent, InteractivePointerEvent, Renderer, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";
import { Player } from "./Player";

export class Mouse extends ClientEntity implements IDrawable {
    MyGraphics: Graphics;
    Debug: Graphics;
    tilePos: Text;
    Position: Vector = Vector.Zero.clone();
    mode: MouseStates;
    MoveState:"None"|"Moving";
    CursorStateGUI: TilingSprite[] = new Array(3);
    Player: Player;

    initialize() {
        this.Player = this.Game.getEntity<Player>("Player");


        this.MyGraphics = new Graphics();
        this.MyGraphics.beginFill(0xFFFFFF);
        this.MyGraphics.drawRect(this.Position.x, this.Position.y, 64, 64);
        this.MyGraphics.endFill();
        this.MyGraphics.alpha = 0.5;

        this.Game.stage.addChild(this.MyGraphics);

        let allGuiItems=3
        for (let i = 0; i < allGuiItems; i++) {
            this.CursorStateGUI[i] = new TilingSprite(this.Game.Loader.resources["menu"].texture, 32, 32);
            this.CursorStateGUI[i].tilePosition.x = -32*i;
            this.CursorStateGUI[i].tilePosition.y = -128+32;
            this.CursorStateGUI[i].interactive=true;
            this.CursorStateGUI[i].setTransform(0+ 32 * i, 0);
            this.CursorStateGUI[i].on("pointerover", (ev: any) => {
                this.CursorStateGUI[i].tilePosition.y = -128-32;
                if(this.mode==i) {this.CursorStateGUI[i].tilePosition.y = -128;}
            });
            this.CursorStateGUI[i].on("pointerout", (ev: any) => {
                this.CursorStateGUI[i].tilePosition.y = -128 + 32;
                if(this.mode==i) {this.CursorStateGUI[i].tilePosition.y = -128;}
            });
            this.CursorStateGUI[i].on("pointerup", (ev: any) => {
                this.mode = i;
                for (let j = 0; j < allGuiItems; j++) {
                    this.CursorStateGUI[j].tilePosition.y = -128 + 32;
                }
                this.CursorStateGUI[i].tilePosition.y = -128;
                console.log(this.mode)
            });

            console.log(this.CursorStateGUI)
            this.Game.gui.addChild(this.CursorStateGUI[i]);
        }
        



        this.tilePos = new Text("No Text", { fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'black', padding:5 });
        this.tilePos.x = 10;
        this.tilePos.y = 32+110;
        this.tilePos.zIndex = -100;
        this.tilePos.resolution = 4;
        this.Game.gui.addChild(this.tilePos);

        this.Game.stage.on("pointermove", (ev: any) => {
            //console.log(ev.data);
            //console.log(ev.data.global.x+", "+ev.data.global.y);
            this.Position.x = ev.data.global.x - this.Game.stage.x;
            this.Position.y = ev.data.global.y - this.Game.stage.y;
            if (this.Position.x < 0) {
                this.Position.x -= 64;
            }
            if (this.Position.y < 0) {
                this.Position.y -= 64;
            }
            this.MyGraphics.x = this.Position.x - this.Position.x % 64;
            this.MyGraphics.y = this.Position.y - this.Position.y % 64;

            this.targetMovementVector =Vector.sub(this.Position, Vector.add(this.Player.Position, {x:32,y:32} as Vector)).normalize().mulNumber(6);
        });


        this.Game.stage.on("pointerdown", (ev: any) => {
            console.log(
                "Absolute tile:"
                + this.absTilePosition()
                + "\nChunk:"
                + this.absChunk()
                + "Chunk relative tile:"
                + this.absTilePosition().mod(this.Game.CoreChunksize)
            );

            if (this.mode == MouseStates.Build) {

            }
            if (this.mode == MouseStates.Interact) {

            }
            if (this.mode == MouseStates.Move) {
                this.MoveState = "Moving";
                this.targetMovementVector =Vector.sub(this.Position, Vector.add(this.Player.Position, {x:32,y:32} as Vector)).normalize().mulNumber(6);
                console.log("Moving!")
            }
        });

        this.Game.stage.on("mouseupoutside", (ev: any) => {
            console.log(
                "Absolute tile:"
                + this.absTilePosition()
                + "\nChunk:"
                + this.absChunk()
                + "Chunk relative tile:"
                + this.absTilePosition().mod(this.Game.CoreChunksize)
            );

            if (this.mode == MouseStates.Build) {

            }
            if (this.mode == MouseStates.Interact) {

            }
            if (this.mode == MouseStates.Move) {
                this.MoveState = "None";
                console.log("NOT Moving!")
            }
            // Reset stuff that should definetly NOT be on.
            this.MoveState = "None";
        });

        this.Game.stage.on("pointerup", (ev: any) => {
            console.log(
                "Absolute tile:"
                + this.absTilePosition()
                + "\nChunk:"
                + this.absChunk()
                + "Chunk relative tile:"
                + this.absTilePosition().mod(this.Game.CoreChunksize)
            );

            if (this.mode == MouseStates.Build) {

            }
            if (this.mode == MouseStates.Interact) {

            }
            if (this.mode == MouseStates.Move) {
                this.MoveState = "None";
                console.log("NOT Moving!")
            }
            // Reset stuff that should definetly NOT be on.
            this.MoveState = "None";
        });
    }

    absTilePosition(): Vector {
        return Vector
            .modNumber(this.Position, 64)
            .sub(this.Position)
            .floor()
            .divNumber(-64);
    }

    absChunk(): Vector {
        return Vector
            .modNumber(this.Position, 64)
            .sub(this.Position).floor()
            .div(this.Game.CoreChunkSizeInPixels)
            .mulNumber(-1)
            .floor();
    }

    relativeToChunkTilePos(): Vector {
        return this
            .absTilePosition()
            .mod(this.Game.CoreChunksize);
    }

    private counter = 1;
    private targetMovementVector: Vector;
    postUpdate() {
        this.counter++;
        if (this.counter % 10 && this.MoveState == "Moving" && this.mode == MouseStates.Move) {
            this.Player.Position.add(this.targetMovementVector)
        }
        this.tilePos.text = this.Position.asString()+"\n"+ this.absTilePosition().asString() + "\n" + this.absChunk().asString() + "\n" + this.relativeToChunkTilePos().asString();
    }
    /**
     * console.log("click on "+
                ""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64) + "\nChunk:"+
                Math.floor((this.Position.x-this.Position.x%64)/this.game.coreChunkSizeInPixels.x)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/this.game.coreChunkSizeInPixels.y)
this.tilePos.text=""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64);

     */
}

export enum MouseStates {
    Interact=0,
    Move=1,
    Build=2
}