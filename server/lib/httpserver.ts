import * as express from "express";
import path from "path";
import { Socket, Server } from "socket.io";
import { PacketRegistry } from "../../server/packets/packet_registry";
import { RegisterPacket } from "../packets/00_register";
import { ChatPacket } from "../packets/01_chat";

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

export class eHTTPServer {
    static io: Server;
    
    static start() {

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html'));
        });

        app.use(express.static(path.join(__dirname, '../')));

        this.io = io;
        io.on("connection", (socket) => {
            
            console.log(socket.handshake.query); // prints { x: "42", EIO: "4", transport: "polling" }
            socket.emit("00",{ok:200, uni: Math.floor(Math.random()*10000000)})
            socket.join('main');
            socket.emit("00",{room:"main"})

            var pr = new PacketRegistry();
            pr.register("00",new RegisterPacket());
            pr.register("01",new ChatPacket());

            pr.packetsRegistred.forEach(packet => {
                socket.on(packet[0],packet[1].handle)
            });
        });

        

        server.listen(8000, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${8000}`);
        });
    }
}
