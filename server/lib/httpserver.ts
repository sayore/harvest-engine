import * as express from "express";
import path from "path";
import { Server } from "socket.io";
import { Player } from "./player";

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

export class eHTTPServer {
    static io: Server;
    static players: Player[] = [];

    static start() {

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html'));
        });

        app.use(express.static(path.join(__dirname, '../')));

        this.io = io;
        io.on("connection", (socket) => {
            
            console.log(socket.handshake.query); // prints { x: "42", EIO: "4", transport: "polling" }
            this.players.push(new Player(socket));
            socket.emit("00",{ok:200, uni: Math.floor(Math.random()*10000000)})
            socket.join('main');
            socket.emit("00",{room:"main"})

        });

        

        server.listen(8000, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${8000}`);
        });
    }
}
