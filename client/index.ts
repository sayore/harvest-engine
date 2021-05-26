import { io } from "socket.io-client";
import { RegisterPacket } from "./packets/00_register";
import { ChatBroadcastPacket } from "./packets/01b_chatbroadcast";
import { ChatPacket } from "./packets/01_chat";
import { PacketRegistry } from "./packets/packet_registry";
import { Player } from "./player";
import { Chat } from "./wrappers/chat";

export let socket = io("http://176.199.119.94:8000/",{
    query: {
      x: "42"
    }
  });

export let player = new Player(socket);
export let chat = new Chat();

setInterval(()=>{
    console.log(socket.active)
},1000) 




