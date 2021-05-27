import { io } from "socket.io-client";
import { AdminGUI } from "./gui/admin";
import { Player } from "./game/entities/player";
import { Chat } from "./wrappers/chat";
import { Game } from "./game/game";

export let socket = io("http://176.199.119.94:8000/",{
    query: {
      x: "42"
    }
  });

export let game = new Game(socket);
game.add(new Player());

game.initialize();
export let chat = new Chat();
export let admingui = new AdminGUI();

admingui.create();

setInterval(()=>{
    console.log(socket.active)
},1000) 




