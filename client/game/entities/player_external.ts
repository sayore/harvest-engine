
export class PlayerExternal {
    UniqueIdentifier: any;
    
    constructor(
        
    ) {
        
    }
}

class PlayerExternalCollection {
    public players: PlayerExternal[] = [];

    public join(player:PlayerExternal) {
        this.players.push(player);
    }
}

export let PlayerCollection = new PlayerExternalCollection();