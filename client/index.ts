import { io } from "socket.io-client";
import { RegisterPacket } from "./packets/00_register";
import { ChatBroadcastPacket } from "./packets/01b_chatbroadcast";
import { ChatPacket } from "./packets/01_chat";
import { PacketRegistry } from "./packets/packet_registry";

const socket = io("http://0.0.0.0:8000/",{
    query: {
      x: "42"
    }
  });

var pr = new PacketRegistry();
pr.register("00",new RegisterPacket(), socket);
pr.register("01",new ChatPacket(), socket);
pr.register("01b",new ChatBroadcastPacket(), socket);

pr.packetsRegistred.forEach(packet => {
    socket.on(packet[0],packet[1].handle)
});

document.querySelector('#sendText').addEventListener('keydown', (ev:KeyboardEvent)=> {
    console.log(ev)
    if (ev.keyCode === 13) {
        if(!ev.shiftKey)
        {
        socket.emit('01',{msg:(<HTMLTextAreaElement>document.querySelector('#sendText')).value})
        document.querySelector('#sendText').value="";}
        return false;
    }
    else {
        return true;
    }
})


setInterval(()=>{
    console.log(socket.active)
},1000) 




176.199.119.94