export class eTile {
    public Text:string = "<span>0</span>";
    public Sprite:ImageBitmap|string;
    constructor(parameters:object | undefined) {
        
    }

    getContent(type:ContentType) : string | ImageBitmap {
        console.log(type)
        if(type==ContentType.Text) return this.Text;
        if(type==ContentType.Sprite) return this.Sprite;
        return "This should not be happening."
    }
}

export enum ContentType {
    Text,
    Sprite
}