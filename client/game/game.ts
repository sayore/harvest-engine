import { Collisions } from "detect-collisions";
import { Socket } from "socket.io-client";
import { ICollisionable } from "../../lib/interface/ICollisionable";
import { TypeCheck } from "../../lib/typeCheck";
import { Entity } from "./entity";
import * as PIXI from 'pixi.js'
import { AbstractRenderer, Container, Loader, Resource, Text, TextStyle } from "pixi.js";

export class Game {
    
    public lastRender = 0
    public socket : Socket;
    public entities: Entity[] = [];
    
    //SYSTEMS
    CollisionSystem = new Collisions();
    UniqueIdentifier: any;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement
    renderer:AbstractRenderer;

    // THIS IS THE LAYER CONTROLL
    baseContainer: Container;
    
    // LAYERS
    stage:Container;
    gui:Container;
    
    gameWidth: number;
    gameHeight: number;
    globalOffset: [x: number, y: number] = [0, 0];
    fpsCounter:Text;
    loader = Loader.shared;
    resources = Loader.shared.resources;
    fpsMedian:number[] = [];
    initialized: any;

    start(socket: Socket) {
        //this.canvas = document.querySelector<HTMLCanvasElement>('#gameCanvas'),
        //this.context = this.canvas.getContext('2d');

        this.renderer = PIXI.autoDetectRenderer({antialias:false ,backgroundColor : 0x1099bb});
        
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        document.body.appendChild(this.renderer.view);

        

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
        this.baseContainer.addChild(this.stage,this.gui);

        console.log(this);
        setInterval(()=>{
            this.loop(0);
        },1000/60)
        let ticker = PIXI.Ticker.shared;
        ticker.stop();
        ticker.speed=3;
        ticker.maxFPS=0;
        // Set this to prevent starting this ticker when listeners are added.
        // By default this is true only for the PIXI.Ticker.shared instance.
        ticker.autoStart = false;
        // FYI, call this to ensure the ticker is stopped. It should be stopped
        // if you have not attempted to render anything yet.
        
        // Call this when you are ready for a running shared ticker.
        ticker.start();
        
        ticker.add((time) => {
            // THIS IS HE REAL GAME LOOP!!
            // LOOK HERE
            this.fpsMedian.push(ticker.FPS);
            if(this.fpsMedian.length>100)
            this.fpsMedian.shift();

            
            this.fpsCounter.text = (this.fpsMedian.reduce((a,y)=>(a+y))/this.fpsMedian.length).toPrecision(4) + "("+this.fpsMedian.length+")\n"+this.entities.length;
            this.fpsCounter.x = -this.stage.x+550;
            this.fpsCounter.y = -this.stage.y+20;

            // Lock GUI to Stage(camera)
            this.gui.x = 0;
            this.gui.y = 0;
            
            this.renderer.render(this.baseContainer); 
        });

        // Initialize
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].initialize();
        }
        this.fpsCounter = new PIXI.Text("No Text",{fontFamily: 'PressStart2P-Regular', fontSize: 8, fill: 'black'});
        this.fpsCounter.x = 920;
            this.fpsCounter.y = 10;
        this.stage.addChild(this.fpsCounter);

        this.initialized=true;
        console.log("Initialized");
        this.registerCollisionObjects();
    }

    update(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(progress);
        }
    }
    preUpdate(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].preUpdate(progress);
        }
    }
    postUpdate(progress:number) {
        // Update the state of the world for the elapsed time since last render
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].postUpdate(progress);
        }
    }

    startDraw() {
        requestAnimationFrame(()=>this.startDraw());

        this.renderer.render(this.stage);
    }

    movableEntities : (ICollisionable)[] = [];
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

    add(entity: Entity) {
        entity.game = this;
        entity.UniqueIdentifier =""+[0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)]+
                        [0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)]+
                        [0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)]+
                        [0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random() *10)];
        this.entities.push(entity);

        if(this.initialized) entity.initialize();
    }

    getEntity<T extends Entity>(type:string) : T {
        return <T>this.entities.find((e)=>e.Type==type);
    }
    getEntities<T extends Entity>(type:string) : T[] {
        return <T[]>this.entities.filter((e)=>e.Type==type);
    }

    removeEntity(entity: Entity) {
        entity.unload();
        this.entities = this.entities.filter(e => e!=entity);
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
        
        //this.draw(); 
        console.log("Resized.")
    }
}