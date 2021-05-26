import { socket } from "..";

export class Chat {
    public chatbox: HTMLDivElement;

    constructor() {
        console.log("Chat is being initialized")
        document.querySelector('#sendText').addEventListener('keydown', (ev:KeyboardEvent)=> {
            console.log(ev)
            if (ev.keyCode === 13) {
                if(!ev.shiftKey)
                {
                socket.emit('01',{msg:(<HTMLTextAreaElement>document.querySelector('#sendText')).value});
        
                (<HTMLTextAreaElement>document.querySelector('#sendText')).value="";}
                return false;
            }
            else {
                return true;
            }
        })
    }
}