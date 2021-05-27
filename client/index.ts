import { io } from "socket.io-client";
import { AdminGUI } from "./gui/admin";
import { RegisterPacket } from "./packets/00_register";
import { ChatPacket } from "./packets/01_chat";
import { PacketRegistry } from "./packets/packet_registry";
import { Player } from "./game/entities/player";
import { Chat } from "./wrappers/chat";

export let socket = io("http://176.199.119.94:8000/",{
    query: {
      x: "42"
    }
  });

export let game = new Game(socket);
game.add(new Player());
export let chat = new Chat();
export let admingui = new AdminGUI();

admingui.create();

setInterval(()=>{
    console.log(socket.active)
},1000) 




