import { io } from "socket.io-client";
import { ABlock } from "./game/entities/ablock";
import { Map } from "./game/entities/map";
import { Mouse } from "./game/entities/mouse";
//import { AdminGUI } from "./gui/admin";
import { Player } from "./game/entities/player";
//import { Chat } from "./wrappers/chat";
import { Game } from "./game/game";

export let socket = io("http://176.199.119.94:8000/",{
    query: {
      x: "42"
    }
  });

export let game = new Game(socket);
//game.add(new Player());

game.add(new Map([0,0]));
game.add(new Mouse([0,0]));
game.add(new Player()); 




//setInterval(()=>{
//  game.add(new ABlock([Math.random()*1000, Math.random()*500+100]));
//  game.add(new ABlock([Math.random()*1000, Math.random()*500+100]));
//},30)
//export let chat = new Chat();
//export let admingui = new AdminGUI();

//admingui.create();

setInterval(()=>{
    console.log(socket.active)
},1000) 




