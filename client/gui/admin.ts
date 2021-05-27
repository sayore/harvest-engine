import { socket } from "..";

export class AdminGUI {
    public layout = [
        { 
            name:"RESET CHAT",
            alt:"Sent Packet 06 (clear chat)",
            action: ()=> {
                socket.emit('06');
                console.log("Sent Packet 06 (clear chat)")
            }
        }
    ];

    create(){
        let  admindiv = document.querySelector<HTMLDivElement>('#admin');
        
        this.layout.forEach(el => {
            var menubutton = document.createElement('div');
            menubutton.classList.add("menubutton");
            menubutton.addEventListener('click',el.action);
            menubutton.innerText = el.name;
            menubutton.setAttribute('alt',el.alt);
            admindiv.appendChild(menubutton);
        });

    }
}
