import { Collisions } from "detect-collisions";
import { Socket } from "socket.io-client";
import { ICollisionable } from "../../lib/interface/ICollisionable";
import { TypeCheck } from "../../lib/typeCheck";
import { ClientEntity } from "./ClientEntity";
import * as PIXI from 'pixi.js'
import { AbstractRenderer, Container, Loader, Resource, Text, TextStyle } from "pixi.js";
import { Vector } from "../../lib/types/Vector";
import { CommonGame } from "../../lib/CommonGame";
import { Entity } from "../../server/game/entity";

export class ClientGame extends CommonGame {
    
    public lastRender = 0
    public socket : Socket;
    public entities: ClientEntity[] = [];
    public coreTilesize = new Vector(64,64);
    public coreChunksize = new Vector(8,8);
    public coreChunkSizeInPixels = Vector.mul(this.coreTilesize,this.coreChunksize);
    
    //SYSTEMS
    CollisionSystem = new Collisions();
    UniqueIdentifier: string;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement
    renderer:AbstractRenderer;

    // THIS IS THE LAYER CONTROLL
    baseContainer: Container;
    
    // LAYERS
    map:Container;
    stage:Container;
    gui:Container;
    
    gameWidth: number;
    gameHeight: number;
    globalOffset: [x: number, y: number] = [0, 0];
    
    loader = Loader.shared;
    resources = Loader.shared.resources;
    fpsMedian:number[] = [];
    

    start(socket: Socket) {
        //this.canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas'),
        //this.context = this.canvas.getContext('2d');

        this.renderer = PIXI.autoDetectRenderer({antialias:false ,backgroundColor : 0x1099bb});
        
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        document.body.appendChild(this.renderer.view);

        

        this.map = new Container();
        this.map.interactive=true;

        this.stage = new Container();
        this.stage.interactive=true;

        this.gui = new Container();
        this.gui.interactive=true;
        
        
        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', ()=>{this.resizeCanvas()}, false);
          
        
        //window.requestAnimationFrame((ts)=>{this.loop(ts)});
        this.socket = socket;


        this.loader
            .add('PressStart2P-Regular', "sprite/PressStart2P-Regular.ttf")
            .add("player","sprite/player-v1.png")
            .add("rpgtileset","sprite/RPGpack_sheet.png")
            .add("menu","sprite/menu.png")
            .add("test","sprite/test.txt")
            .load();
        
        this.loader.onComplete.add(() => {
            //console.log("Loaded all resources.. [ "+ this.loader. +" ]")
            this.initialize();
        }); 
        

        
        //this.startDraw();
    }

    initialize() {
        console.log("Initializing..")

        this.resizeCanvas();

        this.baseContainer = new Container();
        this.baseContainer.addChild(this.map,this.stage,this.gui);

        console.log(this);
        setInterval(()=>{
            this.loop(0);
        },1000/60)
        let ticker = PIXI.Ticker.shared;
        ticker.stop();
        //ticker.speed=3;
        //ticker.maxFPS=0;
        // Set this to prevent starting this ticker when listeners are added.
        // By default this is true only for the PIXI.Ticker.shared instance.
        //ticker.autoStart = false;
        // FYI, call this to ensure the ticker is stopped. It should be stopped
        // if you have not attempted to render anything yet.
        
        
        
        ticker.add((time) => {
            // THIS IS HE REAL GAME LOOP!!
            // LOOK HERE
            this.fpsMedian.push(ticker.FPS);
            if(this.fpsMedian.length>50)
            this.fpsMedian.shift();

            // Lock GUI to Stage(camera)
            //this.gui.x = 0;
            //this.gui.y = 0;
            
            this.renderer.render(this.baseContainer); 
        });

        // Initialize
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].initialize();
        }
        

        this.initialized=true;
        
        console.log("Initialized Entities and Scene");

        // Call this when you are ready for a running shared ticker.
        ticker.start();
        this.registerCollisionObjects();
    }

    

    startDraw() {
        requestAnimationFrame(()=>this.startDraw());

        this.renderer.render(this.stage);
    }

    
    registerCollisionObjects() {
        // Draw the state of the world
        for (let i = 0; i < this.entities.length; i++) {
            var ent = this.entities[i]
            if(TypeCheck.isCollidable(ent))
            {
                this.movableEntities.push(ent);
                console.log("Added "+ ent.Type);
            }
        }
    }

    handleCollisions() {
        let result = this.CollisionSystem.createResult();
        for (let i = 0; i < this.movableEntities.length; i++) {
            const movableEntity = this.movableEntities[i];

            for (let j = 0; j < movableEntity.getColliders().length; j++) {
                const body = movableEntity.getColliders()[j];
                
                const potentials = body.potentials();

                for (const other of potentials) {
                    if (body.collides(other,result)) {
                        movableEntity.collided(result);
                    }
                }
            }
        }
    }

    loop(timestamp:DOMHighResTimeStamp) {
        var progress = timestamp - this.lastRender

        this.preUpdate(progress)
        this.update(progress)
        this.postUpdate(progress)
        this.CollisionSystem.update();
        this.handleCollisions();


        this.lastRender = timestamp
        //window.requestAnimationFrame((ts)=>{this.loop(ts)}); 
    }

    resizeCanvas() {
        //this.canvas.width = window.innerWidth;
        //this.canvas.height = window.innerHeight;
        this.gameWidth = window.innerWidth;
        this.gameHeight = window.innerHeight;

        /**
         * Your drawings need to be inside this function otherwise they will be reset when 
         * you resize the browser window and the canvas goes will be cleared.
         */
        this.renderer.resize(this.gameWidth/2   ,this.gameHeight/2); 

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].windowResized(this.gameWidth   ,this.gameHeight);
        }
        
        //this.draw(); 
        console.log("Resized.")
    }
}