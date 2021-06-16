import { ContentType, eTile } from "./tile";

/**
 * @deprecated
 */
export class eMap {
    constructor(
        public Tiles:eTile[],
        public SizeX:number
    ) {
        console.log("Done initializing.")
    }

    static createEmptyMap(SizeX : number,SizeY: number) : eMap {
        let fullSize = SizeX*SizeY;
        let map = new eMap([],0)
        map.SizeX=SizeX;
        map.Tiles=[];
        for (let i = 0; i < fullSize; i++) {
            map.Tiles.push(new eTile({}));
        }
        return map;
    }

    generateHTML() : string {
        let i = 0;
        let out = "";
        while(true) {
            if(!this.Tiles[i]) break;
            //TODO: Add what to do with Imagedatatype
            if(i%this.SizeX==0)out+="<br>";
            out+=<string>this.Tiles[i].getContent(ContentType.Text);
            i++;
        }
        return out;
    }
}