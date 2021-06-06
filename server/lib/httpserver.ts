import cuid from "cuid";
import * as express from "express";
import path from "path";
import fs from "fs";
import { Server } from "socket.io";
import { Player } from "../game/entities/player";
import { Game } from "../game/game";
import { memoryStorage } from "./redis";
import { permanentDatabase } from "./database";

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/sayore.de/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/sayore.de/cert.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/sayore.de/chain.pem', 'utf8')
};

const app = express();
const https = require('https');
const server = https.createServer(options,app);
const io = new Server(server,{
    maxHttpBufferSize:5e4,
    cookie:true,
    serveClient:true
});

export class eHTTPServer {
    static io: Server;
    static game: Game = new Game();

    static start() {

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html'));
        });

        app.use((req, res, next)=>{
            next();
        });
        app.use(express.static(path.join(__dirname, '../')));
        app.use("/sprite",express.static(path.join(__dirname, '../assets')));

        console.log(typeof(permanentDatabase));
        //var prepStatement = permanentDatabase.prepare("SELECT * FROM players");

        //console.log(prepStatement.get({}));


        this.io = io;
        io.on("connection", (socket) => {
            
            // Client tells us he already has an UUID
            if(socket.handshake.query.requestedUUID!="undefined"){
                console.log(socket.handshake.query.requestedUUID); // prints { x: "42", EIO: "4", transport: "polling" }
                // Check if uuid is in db
                //permanentDatabase.prepare("SELECT * FROM players");
                
                // Create Player 
            } else { // User has not send an UUID with it's request.

                var playersUUID = cuid()
                this.game.add(new Player(cuid(), socket));
            }

            socket.join('main');
            socket.emit("00",{room:"main",uuid:playersUUID,ok:200, uni: Math.floor(Math.random()*10000000)})

        });

        

        server.listen(443, () => {
            console.log(`⚡️[server]: Server is running at https://sayore.de:${443}`);
        });
    }
}
