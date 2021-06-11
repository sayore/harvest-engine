import { io, Socket } from "socket.io-client";
import { Vector } from "../lib/types/Vector";
import { ABlock } from "./game/entities/ablock";
import { ChunkHandler } from "./game/entities/chunkHandler";
import { Mouse } from "./game/entities/mouse";
import { Player } from "./game/entities/player";
import { ClientGame } from "./game/ClientGame";
import { InputHandler } from "./game/InputHandler";

export let socket: Socket;
export let game: ClientGame;
let latestTos=0;

let agreed_tos = localStorage.getItem("tos_agreed");
if(agreed_tos && 1622994700045 < Number(agreed_tos))
{
  console.log("Game Server.. ")
  //export let socket = io("https://sayore.de/",{

  let requestKey = <string>localStorage.getItem('uuid');
  socket = io("https://sayore.de/",{
      secure: true,
      query: {
        x: "42",
        requestedUUID: (requestKey!=null?requestKey:undefined)
      }
    });
console.log("Requested UUID: "+localStorage.getItem('uuid'))

  let game = new ClientGame();
  //game.add(new Player()); 

  game.add(new InputHandler());
  game.add(new ChunkHandler());
  game.add(new Mouse());
  game.add(new Player());

  for (let i = 0; i < 100; i++) {
    //const element = array[i];
    let newBlock = new ABlock()
      newBlock.Position=new Vector(Math.random()*2000-1000,Math.random()*2000-1000);
    game.add(newBlock);
  }

  game.start(socket);

  setInterval(()=>{
      //console.log(socket.active)
  },1000) 

}else {
  document.body.innerHTML=`
  <div id="tos_modal_container">
    <div id='tos_modal'>
Die TOS/AGB noch nicht akzeptiert.
TOS/AGB ist wie folgt zum derzeitigem Stand:

Mit dem klick auf den Button "Ich akzeptiere", stimmen sie folgenden dingen zu:

- Notwendige nutzung von Cloudflare (<a href="https://www.cloudflare.com/de-de/terms/">ToS von Cloudflare</a>)
Dieses Spiel wird mithilfe von Cloudflare's DNS(und anderen Diensten) unterstützt, lesen sie die ToS Cloudflares um mehr darüber zu wissen.

- Das Spiel speichert eine Id/Schlüssel/Token in ihrem localStorage des Browsers.
Dies dient lediglich der Sicherheit(damit ihr Spielcharacter identifiziert werden kann, also ihre Position im Spiel, und andere spielrelevante Elemente, sowie die Zustimmung zu dieser Erklärung und den Zeitpunkt der Zustimmung) und ist für die funktionsweise des Spiels zwingend notwendig.

Auch können ggf. andere Local Storage Schlüssel und Daten die der performance optimierung dienen zwischengespeichert werden.

Es werden unter diesem Schlüssel keine persönlichen Daten, nur im Ausnahmefall beim anlegen eines privaten Accounts, weder Server noch Clientseitig gespeichert.
Gegebenenfalls kann falls ein persönlicher Account erstellt wird nötige Kontaktinformationen abgespeichert werden, diese werden aber unter keinen Umständen mit Drittanbietern, oder werbetreibenden Partnern geteilt.

Diese TOS/AGB wird nicht wieder angezeigt bis es eine Änderung oder Änderungen gab, nachdem auf den "Ich akzeptiere"- Button gedrückt wird.
Die TOS/AGB wird zu einem späteren Punkt in der Entwicklung in einem Menü wieder einsehbar sein.
<div id="accept_tos">Ich akzeptiere</div>
    </div>
  </div>
  `
  document.querySelector("#accept_tos").addEventListener("click",()=>{
    document.querySelector("#tos_modal_container").innerHTML="<div style='font-size:48px;'>Reloading</div>"
    localStorage.setItem("tos_agreed",Date.now().toString());
    window.location.href = window.location.href;
  });
}


