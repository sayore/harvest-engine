import cuid from "cuid";
import * as express from "express";
import path from "path";
import fs from "fs";
import { Server } from "socket.io";
import { Player } from "../game/entities/player";
import { Game } from "../game/game";
import { memoryStorage } from "./redis";
import { permanentDatabase } from "./database";
import { DB_Player } from "../dbobjects/player";

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/sayore.de/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/sayore.de/cert.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/sayore.de/chain.pem', 'utf8')
};

var version = 1;
var versionFilePath = path.join(__dirname, '../version');
if (fs.existsSync(versionFilePath)) {
    version = Number(fs.readFileSync(versionFilePath, 'utf8'));
    version++;
    fs.writeFileSync(versionFilePath, version + "", 'utf8')
} else { fs.writeFileSync(versionFilePath, version + "", 'utf8') }

const app = express();
const https = require('https');
const server = https.createServer(options, app);
const io = new Server(server, {
    maxHttpBufferSize: 5e4,
    cookie: true,
    serveClient: true
});
app.set('view engine', 'ejs');

export class eHTTPServer {
    static io: Server;
    static game: Game = new Game();

    static start() {

        app.get('/', (req, res) => {
            res.render(path.join(__dirname, '../index.ejs'), { version });
        });

        app.use((req, res, next) => {
            next();
        });
        app.use(express.static(path.join(__dirname, '../')));
        app.use("/sprite", express.static(path.join(__dirname, '../assets')));

        this.io = io;
        io.on("connection", (socket) => {

            // Client tells us he already has an UUID
            if (socket.handshake.query.requestedUUID != "undefined") {
                // Check if uuid is in db
                let player = <DB_Player>permanentDatabase.prepare("SELECT * FROM player WHERE uuid=?")
                    .get([socket.handshake.query.requestedUUID]);

                // If we find the UUID, everything is fine, give the Player the UUID he wanted.
                if (player != undefined) {
                    this.game.add(
                        new Player(<string>socket.handshake.query.requestedUUID, socket)
                    );

                    console.log("Player rejoined! (" + socket.handshake.query.requestedUUID + ")");
                } // UUID was not found, we will create a new one in this case and put it into DB.
                else {
                    console.log("Player requested an uuid that does not exist! (" + socket.handshake.query.requestedUUID + ")");
                    var playersUUID = cuid()
                    this.game.add(new Player(playersUUID, socket));
                    permanentDatabase.prepare("INSERT INTO player(uuid) VALUES(?)")
                        .run([playersUUID]);
                    console.log("Created new Player with UUID "+playersUUID);
                }
                // Create Player 
            } else { 
                // User has not send an UUID with it's request. 
                // We create a new UUID, and save it into DB.
                console.log("Player joined!")
                var playersUUID = cuid()

                this.game.add(new Player(playersUUID, socket));

                permanentDatabase.prepare("INSERT INTO player(uuid) VALUES(?)")
                    .run([playersUUID]);
            }

            socket.join('main');
            socket.emit("00", { room: "main", uuid: playersUUID, ok: 200, uni: Math.floor(Math.random() * 10000000) })

        });



        server.listen(443, () => {
            console.log(`⚡️[server]: Server is running at https://sayore.de:${443}`);
        });
    }
}
