import { Graphics, InteractionEvent, InteractivePointerEvent, Renderer, Text, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class Inventory extends ClientEntity implements IDrawable {
    MyGraphics:Graphics;
    crntItemName: Text;
    Position: Vector=<Vector>{x:0,y:0};
    Selected:number=0;

    Menu:TilingSprite
    Cursor:TilingSprite

    initialize() {
        this.MyGraphics = new Graphics();
        
        this.Menu = new TilingSprite(this.game.loader.resources["menu"].texture, 32*9, 32);
        this.Menu.tilePosition.x = 0;
        this.Menu.tilePosition.y = -32;
        this.Menu.setTransform(this.game.gameWidth/4- 32*9/2,this.game.gameHeight/2-32-3);
        
        
        this.Cursor = new TilingSprite(this.game.loader.resources["menu"].texture, 32, 32);
        this.Cursor.tilePosition.x = -64;
        this.Cursor.tilePosition.y = 0;
        this.Cursor.setTransform(this.game.gameWidth/4- 32*9/2 +this.Selected*32,this.game.gameHeight/2-32-3);
            
            
        this.MyGraphics.addChild(this.Menu);
        this.MyGraphics.addChild(this.Cursor);
        this.game.gui.addChild(this.MyGraphics);
        
        
        this.crntItemName = new Text("No Text",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'black'});
        this.crntItemName.setTransform( this.game.gameWidth/4 - (32*9/2), this.game.gameHeight/2-32-16)
       
        this.game.gui.addChild(this.crntItemName);
        
        document.addEventListener("mousewheel", (ev:WheelEvent)=>{
            ev.preventDefault();
            if(ev.deltaY>0) this.Selected++;
            if(ev.deltaY<0) this.Selected--;
            if(this.Selected==-1) this.Selected=8
            if(this.Selected==9) this.Selected=0

            this.crntItemName.text="Item in Slot No "+this.Selected
            this.Cursor.setTransform(this.game.gameWidth/4- 32*9/2 +this.Selected*32,this.game.gameHeight/2-32-3);

            console.log(this.Selected)
        }, false);
    }

    windowResized(width:number, height:number) {
        if(this.crntItemName)
        this.crntItemName.setTransform( this.game.gameWidth/4 - (32*9/2), this.game.gameHeight/2-32-16)
        if(this.Cursor)
        this.Cursor.setTransform(this.game.gameWidth/4- 32*9/2 +this.Selected*32,this.game.gameHeight/2-32-3);
        if(this.Menu)
        this.Menu.setTransform(this.game.gameWidth/4- 32*9/2,this.game.gameHeight/2-32-3);
    }


    /**
     * console.log("click on "+
                ""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64) + "\nChunk:"+
                Math.floor((this.Position.x-this.Position.x%64)/this.game.coreChunkSizeInPixels.x)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/this.game.coreChunkSizeInPixels.y)
this.tilePos.text=""+Math.floor((this.Position.x-this.Position.x%64)/64)+ ", " + Math.floor((this.Position.y-this.Position.y%64)/64);

     */
}
