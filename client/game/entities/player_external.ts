import { Graphics, Sprite, TilingSprite } from "pixi.js";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class PlayerExternal extends ClientEntity implements IDrawable{
    UniqueIdentifier: any;
    MySprite: TilingSprite;
    MyRenderedSprite: Sprite;
    Type="PlayerExternal";
    MyGraphics: Graphics;
    public players: Map<string,PlayerExternal> = new Map();


    constructor(
        
    ) {
        super();

        setInterval(()=>{
            this.game.socket.emit("07",()=>{
                
            })
        },500)
    }
    Position: Vector;

    initialize() {
        this.MyGraphics = new Graphics();
        this.MySprite = new TilingSprite(this.game.loader.resources["player"].texture, 64, 64);
        this.MySprite.tilePosition.x = 0
        this.MyGraphics.addChild(this.MySprite);
    }

    update() {
        this.MyGraphics.setTransform(this.Position.x, this.Position.y)
    }
}

class PlayerExternalCollection {
    public players: Map<string,PlayerExternal> = new Map();

    public join(uuid:string, player:PlayerExternal) {
        this.players.set(uuid, player);
    }
}

export let PlayerCollection = new PlayerExternalCollection();