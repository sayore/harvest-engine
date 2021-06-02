import cuid from "cuid";
import * as express from "express";
import path from "path";
import { Server } from "socket.io";
import { Player } from "../game/entities/player";
import { Game } from "../game/game";

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server,{
    maxHttpBufferSize:5e4,
    cookie:true,
});

export class eHTTPServer {
    static io: Server;
    static game: Game = new Game();

    static start() {

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html'));
        });

        app.use(express.static(path.join(__dirname, '../')));
        app.use("/sprite",express.static(path.join(__dirname, '../assets')));

        this.io = io;
        io.on("connection", (socket) => {
            
            console.log(socket.handshake.query); // prints { x: "42", EIO: "4", transport: "polling" }
            var playersUUID = cuid()
            this.game.add(new Player(cuid(), socket));
            socket.join('main');
            socket.emit("00",{room:"main",uuid:playersUUID,ok:200, uni: Math.floor(Math.random()*10000000)})

        });

        

        server.listen(8000, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${8000}`);
        });
    }
}
