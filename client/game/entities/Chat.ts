import { Text, Graphics } from 'pixi.js';
import { ClientEntity } from '../ClientEntity';
import { game } from '../../index';
import { Vector } from '../../../lib/types/Vector';

export class Chat extends ClientEntity {
  public log: Message[] = [];
  public ChatMode: boolean = false;

  public SendBackground:Graphics;
  public ChatBackground:Graphics;
  public ChatBackgroundAsMask:Graphics;

  initialize() {
    this.ChatBackground = new Graphics();
    this.ChatBackground.beginFill(0x000000,0.2)
    this.ChatBackground.drawCircle(10,game.GameHeight/2-50,10)
    this.ChatBackground.drawRect(10,game.GameHeight/2-50-100,350,100)
    this.ChatBackground.endFill();
    this.ChatBackgroundAsMask = this.ChatBackground.clone();

    this.SendBackground = new Graphics();
    this.SendBackground.beginFill(0x000000,0.2)
    this.SendBackground.drawCircle(10,game.GameHeight/2-45,10)
    this.SendBackground.drawRect(10,game.GameHeight/2-45-100,350,10)
    this.SendBackground.endFill();

    this.addMessage("ABCDEFGHIJK LMNOPQRSTUVWXYZABCDEFG HIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTU VWXYZABCDEFGH IJKLMNOPQRSTUVWXYZ")
    this.addMessage("Test 2 SENes ist fantastisch")
    this.addMessage("Test 3 IENS")
    this.addMessage("Test 4 EINS")
    
    /*let i = 1;
    setInterval(()=>{
      this.addMessage("Test "+(++i)+" EINS ".repeat(Math.floor(Math.random()*10)));
    },500)*/


    this.redrawAt({x:10,y:game.GameHeight/2-50} as Vector);
  }

  addMessage(message: string) {
    let newI = this.log.unshift(new Message(message,this.ChatBackgroundAsMask))
    console.log("Added "+ message)
    for (let i = 0; i < this.log.length; i++) {
      this.log[i].drawAbove((!!this.log[i-1]?this.log[i-1]:this.log[newI]))
    }

    if(this.log.length>=12) {let tbr = this.log.pop(); game.gui.removeChild(tbr.drawText)}
  }

  redrawAt(pos: Vector) {
    if(this.ChatBackground) {game.gui.removeChild(this.ChatBackground)}
    this.ChatBackground = new Graphics();
    this.ChatBackground.beginFill(0x000000,0.2)
    this.ChatBackground.drawCircle(pos.x,pos.y,10)
    this.ChatBackground.drawRect(pos.x,pos.y-100,350,100)
    this.ChatBackground.endFill();
    this.ChatBackgroundAsMask = this.ChatBackground.clone();
    game.gui.addChild(this.ChatBackground);

    this.SendBackground = new Graphics();
    this.SendBackground.beginFill(0x000000,0.4)
    this.SendBackground.drawCircle(pos.x,pos.y,10)
    this.SendBackground.drawRect(pos.x,pos.y+2,350,10)
    this.SendBackground.endFill();
    game.gui.addChild(this.SendBackground);

    this.log[0].drawText.x=pos.x;
    this.log[0].drawText.y=pos.y-this.log[0].drawText.height;
    for (let i = 1; i < this.log.length; i++) {
      this.log[i].mask = this.ChatBackgroundAsMask;
      this.log[i].drawAbove(this.log[i-1])
    }
  }
}

class Message {
  drawText: Text
  
  constructor(
    public message: string,
    public mask:Graphics
  ) {
    this.drawText = new Text(message,{fontFamily: 'PressStart2P-Regular', breakWords:true,  fontSize: 8, fill: 'black', padding:3,wordWrap:true,wordWrapWidth:350 });
    this.drawText.y=game.GameHeight/2-50 - this.drawText.height;  // THIS WILL BE TH STARTING POSITION OF THE CHAT TEXT
    this.drawText.x=10
    this.drawText.resolution=4
    //this.drawText.mask=mask;
    game.gui.addChild(this.drawText)
  }

  drawAbove(message: Message) {
    if(message?.drawText)
    this.drawText.y = Math.round(message.drawText.y - this.drawText.height);

    this.drawText.mask=this.mask;
  }
}