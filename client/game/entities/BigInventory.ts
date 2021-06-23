import { Graphics, InteractionEvent, InteractivePointerEvent, Renderer, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { MathExt } from "../../../lib/ext/MathExt";
import { ClientEntity } from "../ClientEntity";
import { EventTypesAvailable, InputHandler } from "../InputHandler";

export class BigInventory extends ClientEntity implements IDrawable {
    MyGraphics:Graphics;
    crntItemName: Text;
    Position: Vector=<Vector>{x:0,y:0};
    Selected:number=0;
    Rows = 4;
    CurrentRow=0;
    CurrentCell = 0;

    BigInventorySprite: TilingSprite;
    Cursor: TilingSprite
    OpenState = false;

    initialize() {
        this.MyGraphics = new Graphics();
         
      
        this.BigInventorySprite = new TilingSprite(this.Game.Loader.resources["menu"].texture, 320,160);
        this.BigInventorySprite.tilePosition.x = -144;
        this.BigInventorySprite.tilePosition.y = -176;
        this.BigInventorySprite.interactive=true;
        this.BigInventorySprite.setTransform(this.Game.GameWidth/4- 320/2,this.Game.GameHeight/4- 160/2);
        this.BigInventorySprite.on("pointerdown",(ev:InteractionEvent)=>{
            let local = ev.data.getLocalPosition(this.BigInventorySprite);
            console.log("click "+(local.x-16)+", "+(local.y-16));
            this.CurrentCell = MathExt.clamp(Math.floor((local.x-16)/32),0,8);
            this.CurrentRow=   MathExt.clamp(Math.floor((local.y-16)/32),0,3);

            this.updateSelectedPosition();  
        })
        this.MyGraphics.addChild(this.BigInventorySprite);
        
        
        
        
        this.Cursor = new TilingSprite(this.Game.Loader.resources["menu"].texture, 32, 32);
        this.Cursor.tilePosition.x = -64;
        this.Cursor.tilePosition.y = 0;
            
        
        this.MyGraphics.addChild(this.Cursor);

        this.Game.gui.addChild(this.MyGraphics);
        
        
        this.crntItemName = new Text("No Text",{
            fontFamily: 'PressStart2P-Regular', 
            fontSize: 8,
            fill: 'black',
            dropShadow:false,
            padding:5
        });
        //this.crntItemName.resolution = 2;
        this.crntItemName.setTransform( this.Game.GameWidth/4- 320/2,this.Game.GameHeight/4- 160/2)
       
        this.Game.gui.addChild(this.crntItemName);
        

        var ih = this.Game.getEntity<InputHandler>("InputHandler");
        ih.Events.get(EventTypesAvailable.KeyDown).addListener((event: KeyboardEvent) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case "e": // IE/Edge specific value
                    this.toggleVisibility()
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }
        });
        this.setVisibility(false);
    }

    setVisibility(state:boolean) {
        this.OpenState = state;
        this.crntItemName.visible = this.OpenState;
        this.Cursor.visible = this.OpenState;
        this.BigInventorySprite.visible = this.OpenState;
        this.windowResized(this.Game.GameWidth, this.Game.GameHeight);
    }

    toggleVisibility() {
        this.OpenState = !this.OpenState;
        this.crntItemName.visible = this.OpenState;
        this.Cursor.visible = this.OpenState;
        this.BigInventorySprite.visible = this.OpenState;
        this.windowResized(this.Game.GameWidth, this.Game.GameHeight);
    }

    windowResized(width: number, height: number) {
        if (this.OpenState) {
            if (this.crntItemName)
                this.crntItemName.setTransform(this.Game.GameWidth / 4 - 320 / 2, this.Game.GameHeight / 4 - 160 / 2)
            if (this.Cursor)
                this.Cursor.setTransform(this.Game.GameWidth / 4 - 32 * 9 / 2 + this.Selected * 32, this.Game.GameHeight / 2 - 32 - 3);
            if (!!this.BigInventorySprite)
                this.BigInventorySprite.setTransform(this.Game.GameWidth / 4 - 320 / 2, this.Game.GameHeight / 4 - 160 / 2);
        }
    }

    updateSelectedPosition() {
        if (this.OpenState) {
            this.crntItemName.text = "Item in Slot No " + this.CurrentCell+", "+ this.CurrentRow
            this.Cursor.setTransform(this.Game.GameWidth / 4 - 320 / 2 + this.CurrentCell * 32 + 16, this.Game.GameHeight / 4 - 160 / 2 + this.CurrentRow * 32 + 16);

            console.log(this.Selected)
        }
    }

    /**
     * console.log("click on "+
                ""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64) + "\nChunk:"+
                Math.floor((this.Position.x-this.Position.x%64)/this.game.coreChunkSizeInPixels.x)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/this.game.coreChunkSizeInPixels.y)
this.tilePos.text=""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64);

     */
}
