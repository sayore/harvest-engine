import { Graphics, InteractionEvent, InteractivePointerEvent, Renderer, Text } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class Mouse extends ClientEntity implements IDrawable {
    MyGraphics:Graphics;
    tilePos: Text;
    Position: Vector=<Vector>{x:0,y:0};
    mode: MouseStates;
    
    initialize() {
        this.MyGraphics = new Graphics();
            this.MyGraphics.beginFill(0xFFFFFF);
            this.MyGraphics.drawRect(this.Position.x,this.Position.y,64,64);
            this.MyGraphics.endFill();
            this.MyGraphics.alpha=0.5;
            
            this.game.stage.addChild(this.MyGraphics);
            
            
            this.tilePos = new Text("No Text",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'black'});
        this.tilePos.x = 20;
        this.tilePos.y = 20;
        this.tilePos.zIndex=-100;
        this.game.gui.addChild(this.tilePos);
            
        this.game.stage.on("pointermove",(ev:any)=>{
            //console.log(ev.data);
            //console.log(ev.data.global.x+", "+ev.data.global.y);
            this.Position.x = ev.data.global.x-this.game.stage.x;
            this.Position.y = ev.data.global.y-this.game.stage.y;
            if(this.Position.x<0) {
                this.Position.x-=64;
            }
            if(this.Position.y<0) {
                this.Position.y-=64;
            }
            this.MyGraphics.x=this.Position.x-this.Position.x%64;
            this.MyGraphics.y=this.Position.y-this.Position.y%64;
        });


        this.game.stage.on("pointerdown",(ev:any)=>{
            console.log(
                "Absolute tile:"
                +this.absTilePosition()
                +"\nChunk:"
                +this.absChunk()
                +"Chunk relative tile:"
                +this.absTilePosition().mod(this.game.coreChunksize)
            );

            if(this.mode=MouseStates.Build) {
                
            }
            if(this.mode=MouseStates.Interact) {

            }
            if(this.mode=MouseStates.Move) {

            }
        });
    }

    absTilePosition() : Vector {
        return Vector
                    .modNumber(this.Position, 64)
                    .sub(this.Position)
                    .floor()
                    .divNumber(-64);
    }

    absChunk() : Vector {
        return Vector
                    .modNumber(this.Position, 64)
                    .sub(this.Position).floor()
                    .div(this.game.coreChunkSizeInPixels)
                    .mulNumber(-1)
                    .floor();
    }

    relativeToChunkTilePos():Vector {
        return this
                    .absTilePosition()
                    .mod(this.game.coreChunksize);
    }

    private amount=1;
    postUpdate() {
        
        this.tilePos.text=this.absTilePosition().asString()+"\n"+this.absChunk().asString()+"\n"+this.relativeToChunkTilePos().asString();
    }
    /**
     * console.log("click on "+
                ""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64) + "\nChunk:"+
                Math.floor((this.Position.x-this.Position.x%64)/this.game.coreChunkSizeInPixels.x)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/this.game.coreChunkSizeInPixels.y)
this.tilePos.text=""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64);

     */
}

export enum MouseStates {
    Interact,
    Build,
    Move
}