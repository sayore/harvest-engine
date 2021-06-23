import { Body, Circle, Result } from "detect-collisions";
import { Graphics, Sprite, TilingSprite } from "pixi.js";
import { ICollisionable } from "../../../lib/interface/ICollisionable";
import { IDrawable } from "../../../lib/interface/IDrawable";
import { Vector } from "../../../lib/types/Vector";
import { ClientEntity } from "../ClientEntity";

export class PlayerExternal extends ClientEntity implements IDrawable, ICollisionable{
    UniqueIdentifier: any;
    MySprite: TilingSprite;
    MyRenderedSprite: Sprite;
    Type="PlayerExternal";
    MyGraphics: Graphics;
    public players: Map<string,PlayerExternal> = new Map();
    Position = new Vector(9999999999, 9999999999);
    CollisionBox: Circle;

    getColliders(): Body[] {
        this.CollisionBox.x = this.Position.x;
        this.CollisionBox.y = this.Position.y;
        return [this.CollisionBox]
    }
    canMove(): boolean {
        return true;
    }

    constructor(
        uuid: string
    ) {
        super();
        this.UUID=uuid;
        console.log("Player "+ uuid+" has been created.")
        //setInterval(()=>{
        //    this.game.socket.emit("07",()=>{
        //        
        //    })
        //},500)
    }
    collided(result: Result): void {
        
    }

    initialize() {
        this.CollisionBox = this.Game.CollisionSystem.createCircle(this.Position.x, this.Position.y, 32)
        this.CollisionBox.owner = this;

        this.MyGraphics = new Graphics();
        this.MySprite = new TilingSprite(this.Game.Loader.resources["player"].texture, 64, 64);
        this.MySprite.tilePosition.x = 0
        this.MyGraphics.addChild(this.MySprite);

        this.Game.stage.addChild(this.MyGraphics); 
    }

    public targetPosition = new Vector(0,0);
    update() {
        this.Position=this.Position.clone().mulNumber(4).add(this.targetPosition).divNumber(5);
        this.MyGraphics.setTransform(this.Position.x, this.Position.y);

        var lookingDir = this.Position.directionToDeg(this.targetPosition);

        if(lookingDir<=45 && lookingDir>=-45) {
            this.MySprite.tilePosition.y = -128 - 64 // Right
            //console.log("Dir: a")
        } else
        if(lookingDir>=45 && lookingDir<=90+45) {
            this.MySprite.tilePosition.y = -64 //Down
            //console.log("Dir: b")
        } else
        if(lookingDir>=180-45  && lookingDir<=180+45 || lookingDir == 0) {
            this.MySprite.tilePosition.y = -128 //Left
            //console.log("Dir: c")
        } else {
            //Up
            this.MySprite.tilePosition.y = 0 // Up
            //console.log("Dir: d")
            
            }
        
        
        //console.log(Vector.rotateByEightOfPi(Vector.sub(this.Position,this.targetPosition)).directionTo4D())
        /**
         *      case "Down": // IE/Edge specific value
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
         */
    }
}

class PlayerExternalCollection {
    public players: Map<string,PlayerExternal> = new Map();

    public join(uuid:string, player:PlayerExternal) {
        this.players.set(uuid, player);
    }
}

export let PlayerCollection = new PlayerExternalCollection();