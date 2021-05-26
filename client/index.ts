import { io } from "socket.io-client";
import { RegisterPacket } from "./packets/00_register";
import { ChatBroadcastPacket } from "./packets/01b_chatbroadcast";
import { ChatPacket } from "./packets/01_chat";
import { PacketRegistry } from "./packets/packet_registry";
import { Player } from "./player";

const socket = io("http://176.199.119.94:8000/",{
    query: {
      x: "42"
    }
  });

export let player = new Player(socket);

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


setInterval(()=>{
    console.log(socket.active)
},1000) 




