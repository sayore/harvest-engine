import { io } from "socket.io-client";
import { Vector } from "../lib/types/vector";
import { ABlock } from "./game/entities/ablock";
import { Map } from "./game/entities/map";
import { Mouse } from "./game/entities/mouse";
//import { AdminGUI } from "./gui/admin";
import { Player } from "./game/entities/player";
//import { Chat } from "./wrappers/chat";
import { Game } from "./game/game";
import { InputHandler } from "./game/input";

console.log("Game Server.. ")
//export let socket = io("https://sayore.de/",{

export let socket = io("https://sayore.de/",{
    secure: true,
    query: {
      x: "42",
      requestedUUID: <string>localStorage.getItem('uuid') || undefined
    }
  });

export let game = new Game();
//game.add(new Player());

game.add(new InputHandler());
game.add(new Map());
game.add(new Mouse());
game.add(new Player());

for (let i = 0; i < 100; i++) {
  //const element = array[i];
  let newBlock = new ABlock()
    newBlock.Position=new Vector(Math.random()*1000,Math.random()*1000);
  game.add(newBlock);
}

game.start(socket);


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




