/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/cuid/index.js":
/*!************************************!*\
  !*** ./node_modules/cuid/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * cuid.js\n * Collision-resistant UID generator for browsers and node.\n * Sequential for fast db lookups and recency sorting.\n * Safe for element IDs and server-side lookups.\n *\n * Extracted from CLCTR\n *\n * Copyright (c) Eric Elliott 2012\n * MIT License\n */\n\nvar fingerprint = __webpack_require__(/*! ./lib/fingerprint.js */ \"./node_modules/cuid/lib/fingerprint.js\");\nvar pad = __webpack_require__(/*! ./lib/pad.js */ \"./node_modules/cuid/lib/pad.js\");\nvar getRandomValue = __webpack_require__(/*! ./lib/getRandomValue.js */ \"./node_modules/cuid/lib/getRandomValue.js\");\n\nvar c = 0,\n  blockSize = 4,\n  base = 36,\n  discreteValues = Math.pow(base, blockSize);\n\nfunction randomBlock () {\n  return pad((getRandomValue() *\n    discreteValues << 0)\n    .toString(base), blockSize);\n}\n\nfunction safeCounter () {\n  c = c < discreteValues ? c : 0;\n  c++; // this is not subliminal\n  return c - 1;\n}\n\nfunction cuid () {\n  // Starting with a lowercase letter makes\n  // it HTML element ID friendly.\n  var letter = 'c', // hard-coded allows for sequential access\n\n    // timestamp\n    // warning: this exposes the exact date and time\n    // that the uid was created.\n    timestamp = (new Date().getTime()).toString(base),\n\n    // Prevent same-machine collisions.\n    counter = pad(safeCounter().toString(base), blockSize),\n\n    // A few chars to generate distinct ids for different\n    // clients (so different computers are far less\n    // likely to generate the same id)\n    print = fingerprint(),\n\n    // Grab some more chars from Math.random()\n    random = randomBlock() + randomBlock();\n\n  return letter + timestamp + counter + print + random;\n}\n\ncuid.slug = function slug () {\n  var date = new Date().getTime().toString(36),\n    counter = safeCounter().toString(36).slice(-4),\n    print = fingerprint().slice(0, 1) +\n      fingerprint().slice(-1),\n    random = randomBlock().slice(-2);\n\n  return date.slice(-2) +\n    counter + print + random;\n};\n\ncuid.isCuid = function isCuid (stringToCheck) {\n  if (typeof stringToCheck !== 'string') return false;\n  if (stringToCheck.startsWith('c')) return true;\n  return false;\n};\n\ncuid.isSlug = function isSlug (stringToCheck) {\n  if (typeof stringToCheck !== 'string') return false;\n  var stringLength = stringToCheck.length;\n  if (stringLength >= 7 && stringLength <= 10) return true;\n  return false;\n};\n\ncuid.fingerprint = fingerprint;\n\nmodule.exports = cuid;\n\n\n//# sourceURL=webpack:///./node_modules/cuid/index.js?");

/***/ }),

/***/ "./node_modules/cuid/lib/fingerprint.js":
/*!**********************************************!*\
  !*** ./node_modules/cuid/lib/fingerprint.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var pad = __webpack_require__(/*! ./pad.js */ \"./node_modules/cuid/lib/pad.js\");\n\nvar os = __webpack_require__(/*! os */ \"os\"),\n    padding = 2,\n    pid = pad(process.pid.toString(36), padding),\n    hostname = os.hostname(),\n    length = hostname.length,\n    hostId = pad(hostname\n      .split('')\n      .reduce(function (prev, char) {\n        return +prev + char.charCodeAt(0);\n      }, +length + 36)\n      .toString(36),\n    padding);\n\nmodule.exports = function fingerprint () {\n  return pid + hostId;\n};\n\n\n//# sourceURL=webpack:///./node_modules/cuid/lib/fingerprint.js?");

/***/ }),

/***/ "./node_modules/cuid/lib/getRandomValue.js":
/*!*************************************************!*\
  !*** ./node_modules/cuid/lib/getRandomValue.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nvar lim = Math.pow(2, 32) - 1;\n\nmodule.exports = function random () {\n  return Math.abs(crypto.randomBytes(4)\n    .readInt32BE() / lim);\n};\n\n\n//# sourceURL=webpack:///./node_modules/cuid/lib/getRandomValue.js?");

/***/ }),

/***/ "./node_modules/cuid/lib/pad.js":
/*!**************************************!*\
  !*** ./node_modules/cuid/lib/pad.js ***!
  \**************************************/
/***/ ((module) => {

eval("module.exports = function pad (num, size) {\n  var s = '000000000' + num;\n  return s.substr(s.length - size);\n};\n\n\n//# sourceURL=webpack:///./node_modules/cuid/lib/pad.js?");

/***/ }),

/***/ "./lib/map.ts":
/*!********************!*\
  !*** ./lib/map.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eMap\": () => (/* binding */ eMap)\n/* harmony export */ });\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./lib/tile.ts\");\n\nvar eMap = /** @class */ (function () {\n    function eMap(Tiles, SizeX) {\n        this.Tiles = Tiles;\n        this.SizeX = SizeX;\n        console.log(\"Done initializing.\");\n    }\n    eMap.createEmptyMap = function (SizeX, SizeY) {\n        var fullSize = SizeX * SizeY;\n        var map = new eMap([], 0);\n        map.SizeX = SizeX;\n        map.Tiles = [];\n        for (var i = 0; i < fullSize; i++) {\n            map.Tiles.push(new _tile__WEBPACK_IMPORTED_MODULE_0__.eTile({}));\n        }\n        return map;\n    };\n    eMap.prototype.generateHTML = function () {\n        var i = 0;\n        var out = \"\";\n        while (true) {\n            if (!this.Tiles[i])\n                break;\n            //TODO: Add what to do with Imagedatatype\n            if (i % this.SizeX == 0)\n                out += \"<br>\";\n            out += this.Tiles[i].getContent(_tile__WEBPACK_IMPORTED_MODULE_0__.ContentType.Text);\n            i++;\n        }\n        return out;\n    };\n    return eMap;\n}());\n\n\n\n//# sourceURL=webpack:///./lib/map.ts?");

/***/ }),

/***/ "./lib/mod.ts":
/*!********************!*\
  !*** ./lib/mod.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eMap\": () => (/* reexport safe */ _map__WEBPACK_IMPORTED_MODULE_0__.eMap),\n/* harmony export */   \"ContentType\": () => (/* reexport safe */ _tile__WEBPACK_IMPORTED_MODULE_1__.ContentType),\n/* harmony export */   \"eTile\": () => (/* reexport safe */ _tile__WEBPACK_IMPORTED_MODULE_1__.eTile)\n/* harmony export */ });\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ \"./lib/map.ts\");\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile */ \"./lib/tile.ts\");\n\n\nconsole.log(\"loaded harvest-engine\");\n\n\n//# sourceURL=webpack:///./lib/mod.ts?");

/***/ }),

/***/ "./lib/tile.ts":
/*!*********************!*\
  !*** ./lib/tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eTile\": () => (/* binding */ eTile),\n/* harmony export */   \"ContentType\": () => (/* binding */ ContentType)\n/* harmony export */ });\nvar eTile = /** @class */ (function () {\n    function eTile(parameters) {\n        this.Text = \"<span>0</span>\";\n    }\n    eTile.prototype.getContent = function (type) {\n        console.log(type);\n        if (type == ContentType.Text)\n            return this.Text;\n        if (type == ContentType.Sprite)\n            return this.Sprite;\n        return \"This should not be happening.\";\n    };\n    return eTile;\n}());\n\nvar ContentType;\n(function (ContentType) {\n    ContentType[ContentType[\"Text\"] = 0] = \"Text\";\n    ContentType[ContentType[\"Sprite\"] = 1] = \"Sprite\";\n})(ContentType || (ContentType = {}));\n\n\n//# sourceURL=webpack:///./lib/tile.ts?");

/***/ }),

/***/ "./server/game/entities/player.ts":
/*!****************************************!*\
  !*** ./server/game/entities/player.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _packets_00_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../packets/00_register */ \"./server/packets/00_register.ts\");\n/* harmony import */ var _packets_04_move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../packets/04_move */ \"./server/packets/04_move.ts\");\n/* harmony import */ var _packets_packet_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../packets/packet_registry */ \"./server/packets/packet_registry.ts\");\n/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entity */ \"./server/game/entity.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\n\nvar Player = /** @class */ (function (_super) {\n    __extends(Player, _super);\n    function Player(uuid, socket) {\n        var _this = _super.call(this) || this;\n        _this.uuid = uuid;\n        _this.socket = socket;\n        _this.Position = [0, 0];\n        _this.extra = {\n            name: [\"Alp\", \"Bet\", \"Gam\", \"Ome\", \"San\"][Math.floor(Math.random() * 5)]\n                + [\"Alp\", \"Bet\", \"Gam\", \"Ome\", \"San\"][Math.floor(Math.random() * 5)]\n                + [\"Alp\", \"Bet\", \"Gam\", \"Ome\", \"San\"][Math.floor(Math.random() * 5)]\n        };\n        //console.log(\"Player joined\")\n        socket.emit(\"08\", uuid);\n        _this.uuid = uuid;\n        _this.packageRegistry = new _packets_packet_registry__WEBPACK_IMPORTED_MODULE_2__.PacketRegistry();\n        _this.packageRegistry.socket = socket;\n        _this.packageRegistry.player = _this;\n        _this.packageRegistry.register(\"00\", new _packets_00_register__WEBPACK_IMPORTED_MODULE_0__.RegisterPacket());\n        //this.packageRegistry.register(\"01\", new ChatPacket());\n        //this.packageRegistry.register(\"03\", new RefreshPacket());\n        //this.packageRegistry.register(\"06\", new ResetPacket());\n        _this.packageRegistry.register(\"04\", new _packets_04_move__WEBPACK_IMPORTED_MODULE_1__.MovePacket());\n        _this.packageRegistry.packetsRegistred.forEach(function (packet) {\n            socket.on(packet[0], function (args) { /*console.log(\"Received \"+packet[0]);*/ packet[1].handle(args, socket); });\n        });\n        return _this;\n    }\n    return Player;\n}(_entity__WEBPACK_IMPORTED_MODULE_3__.Entity));\n\n\n\n//# sourceURL=webpack:///./server/game/entities/player.ts?");

/***/ }),

/***/ "./server/game/entity.ts":
/*!*******************************!*\
  !*** ./server/game/entity.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Entity\": () => (/* binding */ Entity)\n/* harmony export */ });\nvar Entity = /** @class */ (function () {\n    function Entity() {\n        this.Type = \"NoTypeEntity\";\n    }\n    Entity.prototype.initialize = function () { };\n    Entity.prototype.update = function (progress) { };\n    ;\n    Entity.prototype.draw = function () { };\n    ;\n    Entity.prototype.remove = function () {\n        this.game.remove(this);\n    };\n    ;\n    return Entity;\n}());\n\n\n\n//# sourceURL=webpack:///./server/game/entity.ts?");

/***/ }),

/***/ "./server/game/game.ts":
/*!*****************************!*\
  !*** ./server/game/game.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\nvar Game = /** @class */ (function () {\n    function Game() {\n        this.lastRender = 0;\n        this.entities = [];\n    }\n    Game.prototype.initialize = function () {\n        // Initialize\n        for (var i = 0; i < this.entities.length; i++) {\n            this.entities[i].initialize();\n        }\n    };\n    Game.prototype.update = function (progress) {\n        // Update the state of the world for the elapsed time since last render\n        for (var i = 0; i < this.entities.length; i++) {\n            this.entities[i].update(progress);\n        }\n    };\n    Game.prototype.draw = function () {\n    };\n    Game.prototype.loop = function (timestamp) {\n        var _this = this;\n        var progress = timestamp - this.lastRender;\n        this.update(progress);\n        this.draw();\n        this.lastRender = timestamp;\n        window.requestAnimationFrame(function (ts) { _this.loop(ts); });\n    };\n    Game.prototype.add = function (entity) {\n        entity.game = this;\n        entity.UniqueIdentifier = \"\" + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)] +\n            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)] +\n            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)] +\n            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)];\n        this.entities.push(entity);\n    };\n    Game.prototype.remove = function (entity) {\n    };\n    return Game;\n}());\n\n\n\n//# sourceURL=webpack:///./server/game/game.ts?");

/***/ }),

/***/ "./server/index.ts":
/*!*************************!*\
  !*** ./server/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_mod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/mod */ \"./lib/mod.ts\");\n/* harmony import */ var _lib_httpserver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/httpserver */ \"./server/lib/httpserver.ts\");\n\n\nvar map = _lib_mod__WEBPACK_IMPORTED_MODULE_0__.eMap.createEmptyMap(40, 20);\n_lib_httpserver__WEBPACK_IMPORTED_MODULE_1__.eHTTPServer.start();\n\n\n//# sourceURL=webpack:///./server/index.ts?");

/***/ }),

/***/ "./server/lib/database.ts":
/*!********************************!*\
  !*** ./server/lib/database.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"permanentDatabase\": () => (/* binding */ permanentDatabase)\n/* harmony export */ });\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n\nvar db = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())('./foobar.db', { verbose: console.log });\nvar permanentDatabase = db;\n\n\n//# sourceURL=webpack:///./server/lib/database.ts?");

/***/ }),

/***/ "./server/lib/httpserver.ts":
/*!**********************************!*\
  !*** ./server/lib/httpserver.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eHTTPServer\": () => (/* binding */ eHTTPServer)\n/* harmony export */ });\n/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cuid */ \"./node_modules/cuid/index.js\");\n/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cuid__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _game_entities_player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../game/entities/player */ \"./server/game/entities/player.ts\");\n/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../game/game */ \"./server/game/game.ts\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database */ \"./server/lib/database.ts\");\n\n\n\n\n\n\n\n\nvar options = {\n    key: fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync('/etc/letsencrypt/live/sayore.de/privkey.pem', 'utf8'),\n    cert: fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync('/etc/letsencrypt/live/sayore.de/cert.pem', 'utf8'),\n    ca: fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync('/etc/letsencrypt/live/sayore.de/chain.pem', 'utf8')\n};\nvar app = express__WEBPACK_IMPORTED_MODULE_1__();\nvar https = __webpack_require__(/*! https */ \"https\");\nvar server = https.createServer(options, app);\nvar io = new socket_io__WEBPACK_IMPORTED_MODULE_4__.Server(server, {\n    maxHttpBufferSize: 5e4,\n    cookie: true,\n    serveClient: true\n});\nvar eHTTPServer = /** @class */ (function () {\n    function eHTTPServer() {\n    }\n    eHTTPServer.start = function () {\n        var _this = this;\n        app.get('/', function (req, res) {\n            res.sendFile(path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../index.html'));\n        });\n        app.use(function (req, res, next) {\n            next();\n        });\n        app.use(express__WEBPACK_IMPORTED_MODULE_1__.static(path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../')));\n        app.use(\"/sprite\", express__WEBPACK_IMPORTED_MODULE_1__.static(path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../assets')));\n        console.log(typeof (_database__WEBPACK_IMPORTED_MODULE_7__.permanentDatabase));\n        //var prepStatement = permanentDatabase.prepare(\"SELECT * FROM players\");\n        //console.log(prepStatement.get({}));\n        this.io = io;\n        io.on(\"connection\", function (socket) {\n            // Client tells us he already has an UUID\n            if (socket.handshake.query.requestedUUID != \"undefined\") {\n                console.log(\"Player rejoined! (\" + socket.handshake.query.requestedUUID + \")\");\n                // Check if uuid is in db\n                //permanentDatabase.prepare(\"SELECT * FROM players\");\n                // Create Player \n                _this.game.add(new _game_entities_player__WEBPACK_IMPORTED_MODULE_5__.Player(socket.handshake.query.requestedUUID, socket));\n            }\n            else { // User has not send an UUID with it's request.\n                console.log(\"Player joined!\");\n                var playersUUID = cuid__WEBPACK_IMPORTED_MODULE_0___default()();\n                _this.game.add(new _game_entities_player__WEBPACK_IMPORTED_MODULE_5__.Player(cuid__WEBPACK_IMPORTED_MODULE_0___default()(), socket));\n            }\n            socket.join('main');\n            socket.emit(\"00\", { room: \"main\", uuid: playersUUID, ok: 200, uni: Math.floor(Math.random() * 10000000) });\n        });\n        server.listen(443, function () {\n            console.log(\"\\u26A1\\uFE0F[server]: Server is running at https://sayore.de:\" + 443);\n        });\n    };\n    eHTTPServer.game = new _game_game__WEBPACK_IMPORTED_MODULE_6__.Game();\n    return eHTTPServer;\n}());\n\n\n\n//# sourceURL=webpack:///./server/lib/httpserver.ts?");

/***/ }),

/***/ "./server/packets/00_register.ts":
/*!***************************************!*\
  !*** ./server/packets/00_register.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RegisterPacket\": () => (/* binding */ RegisterPacket)\n/* harmony export */ });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./server/packets/base.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar RegisterPacket = /** @class */ (function (_super) {\n    __extends(RegisterPacket, _super);\n    function RegisterPacket() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    RegisterPacket.prototype.handle = function (args) {\n        console.log(\"Working Packet 00: \" + JSON.stringify(args));\n    };\n    return RegisterPacket;\n}(_base__WEBPACK_IMPORTED_MODULE_0__.BasePacket));\n\n\n\n//# sourceURL=webpack:///./server/packets/00_register.ts?");

/***/ }),

/***/ "./server/packets/04_move.ts":
/*!***********************************!*\
  !*** ./server/packets/04_move.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MovePacket\": () => (/* binding */ MovePacket)\n/* harmony export */ });\n/* harmony import */ var _lib_httpserver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/httpserver */ \"./server/lib/httpserver.ts\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./server/packets/base.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar MovePacket = /** @class */ (function (_super) {\n    __extends(MovePacket, _super);\n    function MovePacket() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    MovePacket.prototype.handle = function (args) {\n        //this.player.game.entities.\n        var found = MovePacket.playerPositions.find(function (pp) { return (pp.UUID == args.UUID && pp.UUID != undefined); });\n        if (found) {\n            found.Position = args.Position;\n        }\n        else {\n            MovePacket.playerPositions.push(args);\n        }\n        _lib_httpserver__WEBPACK_IMPORTED_MODULE_0__.eHTTPServer.io.emit('04b', MovePacket.playerPositions);\n    };\n    MovePacket.prototype.send = function (socket, message) {\n    };\n    MovePacket.playerPositions = [];\n    return MovePacket;\n}(_base__WEBPACK_IMPORTED_MODULE_1__.BasePacket));\n\n\n\n//# sourceURL=webpack:///./server/packets/04_move.ts?");

/***/ }),

/***/ "./server/packets/base.ts":
/*!********************************!*\
  !*** ./server/packets/base.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BasePacket\": () => (/* binding */ BasePacket)\n/* harmony export */ });\nvar BasePacket = /** @class */ (function () {\n    function BasePacket() {\n    }\n    BasePacket.prototype.handle = function (obj, socket) {\n    };\n    BasePacket.prototype.setPlayer = function (player) {\n        this.player = player;\n    };\n    return BasePacket;\n}());\n\n\n\n//# sourceURL=webpack:///./server/packets/base.ts?");

/***/ }),

/***/ "./server/packets/packet_registry.ts":
/*!*******************************************!*\
  !*** ./server/packets/packet_registry.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PacketRegistry\": () => (/* binding */ PacketRegistry)\n/* harmony export */ });\nvar PacketRegistry = /** @class */ (function () {\n    function PacketRegistry() {\n        this.packetsRegistred = [];\n    }\n    PacketRegistry.prototype.register = function (name, packet) {\n        console.log(\"Registred \", name, \" Packet\", packet.constructor.name);\n        packet.setPlayer(this.player);\n        //console.log(packet);\n        this.packetsRegistred.push([name, packet]);\n    };\n    return PacketRegistry;\n}());\n\n\n\n//# sourceURL=webpack:///./server/packets/packet_registry.ts?");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("better-sqlite3");;

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/index.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;