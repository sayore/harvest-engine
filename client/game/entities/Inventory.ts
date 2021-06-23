import { Graphics, InteractionEvent, InteractivePointerEvent, Renderer, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class Inventory extends ClientEntity implements IDrawable {
    MyGraphics:Graphics;
    crntItemName: Text;
    Position: Vector=<Vector>{x:0,y:0};
    Selected:number=0;

    QuickInventoryBar:TilingSprite
    Cursor:TilingSprite

    initialize() {
        this.MyGraphics = new Graphics();
         
        this.QuickInventoryBar = new TilingSprite(this.Game.Loader.resources["menu"].texture, 32*9, 32);
        this.QuickInventoryBar.tilePosition.x = 0;
        this.QuickInventoryBar.tilePosition.y = -32;
        this.QuickInventoryBar.interactive=true;
        this.QuickInventoryBar.setTransform(this.Game.GameWidth/4- 32*9/2,this.Game.GameHeight/2-32-3);
        this.QuickInventoryBar.on("pointerdown",(ev:InteractionEvent)=>{
            let local = ev.data.getLocalPosition(this.QuickInventoryBar);
            console.log("click "+local.x+", "+local.y);
            this.Selected = Math.floor(local.x/32);

            this.updateSelectedPosition();  
        })
        
        
        this.Cursor = new TilingSprite(this.Game.Loader.resources["menu"].texture, 32, 32);
        this.Cursor.tilePosition.x = -64;
        this.Cursor.tilePosition.y = 0;
        this.Cursor.setTransform(this.Game.GameWidth/4- 32*9/2 +this.Selected*32,this.Game.GameHeight/2-32-3);
            
        this.MyGraphics.addChild(this.QuickInventoryBar);
        this.MyGraphics.addChild(this.Cursor);

        this.Game.gui.addChild(this.MyGraphics);
        
        
        this.crntItemName = new Text("No Text",{
            fontFamily: 'PressStart2P-Regular', 
            fontSize: 8,
            fill: 'black',
            dropShadow:false,
            padding: 5,
        });
        this.crntItemName.resolution = 4;
        this.crntItemName.setTransform( Math.floor(this.Game.GameWidth/4 - (32*9/2)), Math.floor(this.Game.GameHeight/2-32-16))
       
        this.Game.gui.addChild(this.crntItemName);
        
        document.addEventListener("wheel", (ev:WheelEvent)=>{
            ev.preventDefault();
            if(ev.deltaY>0) this.Selected++;
            if(ev.deltaY<0) this.Selected--; 
            if(this.Selected==-1) this.Selected=8
            if(this.Selected==9) this.Selected=0

            this.updateSelectedPosition();            
        }, false);
    }

    windowResized(width:number, height:number) {
        if(this.crntItemName)
        this.crntItemName.setTransform( Math.floor(this.Game.GameWidth/4 - (32*9/2)), Math.floor(this.Game.GameHeight/2-32-16))
        if(this.Cursor)
        this.Cursor.setTransform(this.Game.GameWidth/4- 32*9/2 +this.Selected*32,this.Game.GameHeight/2-32-3);
        if(this.QuickInventoryBar)
        this.QuickInventoryBar.setTransform(this.Game.GameWidth/4- 32*9/2,this.Game.GameHeight/2-32-3);
    }

    updateSelectedPosition() {
        this.crntItemName.text="Item in Slot No "+this.Selected
        this.Cursor.setTransform(this.Game.GameWidth/4- 32*9/2 +this.Selected*32,this.Game.GameHeight/2-32-3);

        console.log(this.Selected)
    }

    /**
     * console.log("click on "+
                ""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64) + "\nChunk:"+
                Math.floor((this.Position.x-this.Position.x%64)/this.game.coreChunkSizeInPixels.x)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/this.game.coreChunkSizeInPixels.y)
this.tilePos.text=""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64);

     */
}
