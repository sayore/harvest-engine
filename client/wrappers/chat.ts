import { socket } from "..";

export class Chat {
    public chatbox: HTMLDivElement;

    static clear() {
        let chatgui = document.querySelector<HTMLDivElement>('#chat');
        chatgui.innerHTML="";
    }

    static addmessage(str:string) {
        if(typeof(str)!="string") {
            console.log("chat.addmessage has received a non-string value(an "+typeof(str)+") and will abort. ("+JSON.stringify(str)+")");
            return;
        }
        
        let chatgui = document.querySelector<HTMLDivElement>('#chat');
        var chatmsg = document.createElement('div');
        chatmsg.classList.add("chatmsg");
        //chatmsg.addEventListener('click',el.action);

        // Remove all new lines except for the first 2
        var spl = str.split('\n')
        var out = spl[0]+'\n'+(spl[1] || "")+(!!spl[1]?'\n':"");
        spl = spl.slice(2);
        out+=spl.join();

        chatmsg.innerText = out;
        chatmsg.setAttribute('alt',str);
        chatgui.appendChild(chatmsg);

        if(chatgui.children.length > 20) {
            chatgui.removeChild(chatgui.firstChild);
        }
        chatgui.scrollTop = chatgui.scrollHeight;

    }

    static addmessages(strarr:string[]) {
        let chatgui = document.querySelector<HTMLDivElement>('#chat');
        strarr.forEach(str => {
            
        var chatmsg = document.createElement('div');
        chatmsg.classList.add("chatmsg");
        //chatmsg.addEventListener('click',el.action);

        // Remove all new lines except for the first 2
        var spl = str.split('\n')
        var out = spl[0]+'\n'+(spl[1] || "")+(!!spl[1]?'\n':"");
        spl = spl.slice(2);
        out+=spl.join();

        chatmsg.innerText = out;
        chatmsg.setAttribute('alt',str);
        chatgui.appendChild(chatmsg);

        if(chatgui.children.length > 20) {
            chatgui.removeChild(chatgui.firstChild);
        }
    });
    chatgui.scrollTop = chatgui.scrollHeight;

    }

    constructor() {
        console.log("Chat is being initialized")
        document.querySelector('#sendText').addEventListener('keydown', (ev:KeyboardEvent)=> {
            console.log(ev)
            if (ev.keyCode === 13) {
                if(!ev.shiftKey)
                {
                    ev.preventDefault();
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