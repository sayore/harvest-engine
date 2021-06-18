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

/***/ "./server/dbinstall/install.ts":
/*!*************************************!*\
  !*** ./server/dbinstall/install.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Install\": () => (/* binding */ Install)\n/* harmony export */ });\n/* harmony import */ var _lib_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/database */ \"./server/lib/database.ts\");\n\nvar Install = /** @class */ (function () {\n    function Install() {\n    }\n    Install.installAll = function () {\n        Install.player();\n        Install.chunks();\n        Install.account();\n    };\n    Install.chunks = function () {\n        new _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Table(\"chunks\")\n            .addField(\"x\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.INT)\n            .addField(\"y\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.INT)\n            .addField(\"data\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.TEXT)\n            .createOrUpdateTable()\n            .addIndex([\"x\", \"y\"], \"spartialindex\", true);\n    };\n    Install.player = function () {\n        new _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Table(\"player\")\n            .addField(\"uuid\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.VARCHAR, 64, [\"PRIMARY KEY\"])\n            .addField(\"accountid\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.INT)\n            .addField(\"data\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.TEXT)\n            .createOrUpdateTable()\n            .addIndex([\"uuid\"], \"nameindex\", true);\n    };\n    Install.account = function () {\n        new _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Table(\"account\")\n            .addField(\"id\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.INT, 64, [\"PRIMARY KEY\"])\n            .addField(\"loginname\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.TEXT)\n            .addField(\"password\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.TEXT)\n            .addField(\"data\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.TEXT)\n            .createOrUpdateTable()\n            .addIndex([\"loginname\"], \"nameindex\", true);\n    };\n    return Install;\n}());\n\n\n\n//# sourceURL=webpack:///./server/dbinstall/install.ts?");

/***/ }),

/***/ "./server/game/entities/player.ts":
/*!****************************************!*\
  !*** ./server/game/entities/player.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _packets_00_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../packets/00_register */ \"./server/packets/00_register.ts\");\n/* harmony import */ var _packets_04_move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../packets/04_move */ \"./server/packets/04_move.ts\");\n/* harmony import */ var _packets_09_chunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../packets/09_chunk */ \"./server/packets/09_chunk.ts\");\n/* harmony import */ var _packets_packet_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../packets/packet_registry */ \"./server/packets/packet_registry.ts\");\n/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../entity */ \"./server/game/entity.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\n\n\nvar Player = /** @class */ (function (_super) {\n    __extends(Player, _super);\n    function Player(uuid, socket) {\n        var _this = _super.call(this) || this;\n        _this.uuid = uuid;\n        _this.socket = socket;\n        _this.Position = [0, 0];\n        _this.extra = {\n            name: [\"Alp\", \"Bet\", \"Gam\", \"Ome\", \"San\"][Math.floor(Math.random() * 5)]\n                + [\"Alp\", \"Bet\", \"Gam\", \"Ome\", \"San\"][Math.floor(Math.random() * 5)]\n                + [\"Alp\", \"Bet\", \"Gam\", \"Ome\", \"San\"][Math.floor(Math.random() * 5)]\n        };\n        //console.log(\"Player joined\")\n        _this.uuid = uuid;\n        _this.packageRegistry = new _packets_packet_registry__WEBPACK_IMPORTED_MODULE_3__.PacketRegistry();\n        _this.packageRegistry.socket = socket;\n        _this.packageRegistry.player = _this;\n        _this.packageRegistry.register(\"00\", new _packets_00_register__WEBPACK_IMPORTED_MODULE_0__.RegisterPacket());\n        //this.packageRegistry.register(\"01\", new ChatPacket());\n        //this.packageRegistry.register(\"03\", new RefreshPacket());\n        //this.packageRegistry.register(\"06\", new ResetPacket());\n        _this.packageRegistry.register(\"04\", new _packets_04_move__WEBPACK_IMPORTED_MODULE_1__.MovePacket());\n        _this.packageRegistry.register(\"09\", new _packets_09_chunk__WEBPACK_IMPORTED_MODULE_2__.ChunkPacket());\n        _this.packageRegistry.packetsRegistred.forEach(function (packet) {\n            socket.on(packet[0], function (args) { /*console.log(\"Received \"+packet[0]);*/ packet[1].handle(args, socket); });\n        });\n        setTimeout(function () {\n            socket.emit(\"08\", uuid);\n            //socket.emit(\"10\",Buffer.from(\"Hello\"));\n        }, 2000);\n        return _this;\n    }\n    return Player;\n}(_entity__WEBPACK_IMPORTED_MODULE_4__.Entity));\n\n\n\n//# sourceURL=webpack:///./server/game/entities/player.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dbinstall_install__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbinstall/install */ \"./server/dbinstall/install.ts\");\n/* harmony import */ var _lib_httpserver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/httpserver */ \"./server/lib/httpserver.ts\");\n/* harmony import */ var _tests_test__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tests/test */ \"./server/tests/test.ts\");\n\n\n\n_tests_test__WEBPACK_IMPORTED_MODULE_2__.Test.test();\n_dbinstall_install__WEBPACK_IMPORTED_MODULE_0__.Install.installAll();\n_lib_httpserver__WEBPACK_IMPORTED_MODULE_1__.eHTTPServer.start();\n\n\n//# sourceURL=webpack:///./server/index.ts?");

/***/ }),

/***/ "./server/lib/database.ts":
/*!********************************!*\
  !*** ./server/lib/database.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SQL\": () => (/* binding */ SQL),\n/* harmony export */   \"permanentDatabase\": () => (/* binding */ permanentDatabase)\n/* harmony export */ });\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n\nvar db = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())('./foobar.db', {});\n//const db = new Database('./foobar.db', { verbose: console.log });\nvar SQL;\n(function (SQL) {\n    var Fieldtype;\n    (function (Fieldtype) {\n        Fieldtype[\"VARCHAR\"] = \"VARCHAR\";\n        Fieldtype[\"INT\"] = \"INT\";\n        Fieldtype[\"TEXT\"] = \"TEXT\";\n    })(Fieldtype = SQL.Fieldtype || (SQL.Fieldtype = {}));\n    var Extras;\n    (function (Extras) {\n        Extras[\"PK\"] = \"PRIMARY KEY\";\n        Extras[\"AI\"] = \"AUTOINCREMENT\";\n        Extras[\"NNULL\"] = \"NOT NULL\";\n        Extras[\"NULL\"] = \"NULL\";\n        Extras[\"DEF0\"] = \"DEFAULT 0\";\n    })(Extras = SQL.Extras || (SQL.Extras = {}));\n    var Info = /** @class */ (function () {\n        function Info() {\n        }\n        /**\n         * Returns info about the tables in the Database. (No columns, only pure internal info.)\n         * @returns\n         */\n        Info.getTables = function () {\n            return db.prepare(\"SELECT * FROM sqlite_master\").all();\n        };\n        /**\n         * Returns an Array with info about the fields of a table.\n         * @returns\n         */\n        Info.getTableInfo = function (table) {\n            if (typeof (table) == \"string\")\n                return db.prepare(\"PRAGMA table_info('\" + table + \"')\").all();\n            else\n                return db.prepare(\"PRAGMA table_info(\" + table.tblname + \")\").all();\n        };\n        Info.getIndexInfo = function (table) {\n            if (typeof (table) == \"string\")\n                return db.prepare(\"PRAGMA index_list('\" + table + \"')\").all();\n            else\n                return db.prepare(\"PRAGMA index_list(\" + table.tblname + \")\").all();\n        };\n        Info.existsTable = function (table) {\n            return !!db.prepare(\"SELECT * FROM sqlite_master WHERE tbl_name='\" + table + \"'\").get();\n        };\n        return Info;\n    }());\n    SQL.Info = Info;\n    var Request = /** @class */ (function () {\n        function Request() {\n        }\n        return Request;\n    }());\n    SQL.Request = Request;\n    var Table = /** @class */ (function () {\n        function Table(tblname, tableInfo) {\n            var _this = this;\n            if (tableInfo === void 0) { tableInfo = Info.getTableInfo(tblname); }\n            this.tblname = tblname;\n            this.tableInfo = tableInfo;\n            this.fields = [];\n            tableInfo.forEach(function (ci) {\n                _this.fields.push(new Field(ci.name, null, null, null).setTypeAsString(ci.type));\n            });\n        }\n        Table.prototype.addIndex = function (fieldnames, indexname, unique) {\n            if (indexname === void 0) { indexname = null; }\n            if (unique === void 0) { unique = true; }\n            db.exec(\"CREATE \" + (unique ? \"UNIQUE\" : \"\") + \" INDEX IF NOT EXISTS \" + (indexname == null ? \"idx_\" + this.tblname : \"idx_\" + this.tblname + \"_\" + indexname) + \"\\n              ON \" + this.tblname + \" \\n                (\" + fieldnames.join(\",\") + \")\");\n            return this;\n        };\n        Table.prototype.getStatements = function () {\n            var statements = [];\n            statements.push();\n            return statements;\n        };\n        Table.prototype.create = function () {\n            return db.exec(\"CREATE TABLE \" + this.tblname + \"(\\n                \" + this.fields.map(function (f) { return f.asSQL(); }).join(\",\\n\") + \"\\n            )\");\n        };\n        Table.prototype.where = function (where) {\n            return db.prepare(\"SELECT * FROM \" + this.tblname + \" WHERE \" + where).all();\n        };\n        Table.prototype.find = function (where) {\n            return db.prepare(\"SELECT * FROM \" + this.tblname + \" WHERE \" + where).get();\n        };\n        Table.prototype.delete = function () {\n            db.exec(\"DROP TABLE \" + this.tblname);\n        };\n        Table.prototype.exists = function () {\n            return this.tableInfo.length == 1;\n        };\n        /**\n         * Will create the table & append columns that do not exist on a table.\n         * Will info on columns that exist but are not defined in the table object.\n         * @param table\n         */\n        Table.prototype.createOrUpdateTable = function () {\n            var _this = this;\n            //Check for existence of table\n            if (Info.existsTable(this.tblname)) {\n                var crntColumns = this.tableInfo.map(function (c) { return c.name; });\n                var wishedColumns = this.fields.map(function (c) { return c.name; });\n                wishedColumns.forEach(function (c) {\n                    if (crntColumns.indexOf(c) == -1) {\n                        // Column at this point in time does not exist.\n                        // Create column\n                        console.log(c + \" does not exist yet. Will be created.\");\n                        _this.callToField(_this.fields.find(function (f) { return f.name == c; }));\n                    }\n                });\n                crntColumns.forEach(function (c) {\n                    if (wishedColumns.indexOf(c) == -1) {\n                        // Inform that there is a column in DB that could be unused.\n                        //\n                        console.log(c + \" does exist. But could be unused.\");\n                    }\n                });\n            }\n            else {\n                //Create whole table.\n                this.create();\n            }\n            return this;\n        };\n        Table.prototype.addField = function (name, fieldtype, size, extra) {\n            if (fieldtype === void 0) { fieldtype = Fieldtype.INT; }\n            if (size === void 0) { size = null; }\n            if (extra === void 0) { extra = []; }\n            if (typeof (name) == \"string\") {\n                this.fields.push(new Field(name, fieldtype, size, extra));\n            }\n            else {\n                this.fields.push(name);\n            }\n            return this;\n        };\n        Table.prototype.callToField = function (field) {\n            //check if the column maybe already exists, if it does do nothing\n            var crntColumns = this.tableInfo.map(function (c) { return c.name; });\n            if (crntColumns.indexOf(field.name) == -1) {\n                var retval = db.exec(\"ALTER TABLE \" + this.tblname + \"\\n                                        ADD \" + field.asSQL() + \";\");\n                this.updateTableInfo();\n                return true;\n            }\n            return false;\n        };\n        Table.prototype.removeField = function (field) {\n            //check if the column maybe already exists, if it does do nothing\n            var crntColumns = this.tableInfo.map(function (c) { return c.name; });\n            if (crntColumns.indexOf(field.name) == 1) {\n                var retval = db.exec(\"ALTER TABLE \" + this.tblname + \"\\n                                        REMOVE \" + field.asSQL() + \";\");\n                this.updateTableInfo();\n                return true;\n            }\n            return false;\n        };\n        Table.prototype.getTableInfo = function () { return Info.getTableInfo(this.tblname); };\n        Table.prototype.getIndexInfo = function () { return Info.getIndexInfo(this.tblname); };\n        Table.prototype.updateTableInfo = function () {\n            this.tableInfo = Info.getTableInfo(this.tblname);\n        };\n        return Table;\n    }());\n    SQL.Table = Table;\n    var Field = /** @class */ (function () {\n        function Field(name, fieldtype, size, extra) {\n            if (fieldtype === void 0) { fieldtype = Fieldtype.INT; }\n            if (size === void 0) { size = null; }\n            if (extra === void 0) { extra = []; }\n            this.name = name;\n            this.fieldtype = fieldtype;\n            this.size = size;\n            this.extra = extra;\n            if (this.fieldtype == Fieldtype.INT && !this.size) {\n                this.size = 9;\n            }\n            if (this.fieldtype == Fieldtype.VARCHAR && !this.size) {\n                this.size = 255;\n            }\n        }\n        Field.prototype.asSQL = function () {\n            return this.name + \" \" + this.fieldtype + (this.size ? \"(\" + this.size + \")\" : \"\") + \" \" + this.extra.join(\" \");\n        };\n        Field.prototype.setTypeAsString = function (type) {\n            var typename = \"\";\n            var typelength = \"\";\n            for (var i = 0; i < type.length; i++) {\n                var char = type[i];\n                if (char.match(/[A-Za-z]/)) {\n                    typename += char;\n                }\n                if (char.match(/[0-9]/)) {\n                    typelength += char;\n                }\n            }\n            this.fieldtype = typename;\n            this.size = (typelength == \"\" ? null : Number(typelength));\n            return this;\n        };\n        Field.prototype.addExtra = function (extra) {\n            this.extra.push(extra);\n        };\n        return Field;\n    }());\n    SQL.Field = Field;\n})(SQL || (SQL = {}));\nvar permanentDatabase = db;\n\n\n//# sourceURL=webpack:///./server/lib/database.ts?");

/***/ }),

/***/ "./server/lib/httpserver.ts":
/*!**********************************!*\
  !*** ./server/lib/httpserver.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eHTTPServer\": () => (/* binding */ eHTTPServer)\n/* harmony export */ });\n/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cuid */ \"./node_modules/cuid/index.js\");\n/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cuid__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _game_entities_player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../game/entities/player */ \"./server/game/entities/player.ts\");\n/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../game/game */ \"./server/game/game.ts\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database */ \"./server/lib/database.ts\");\n\n\n\n\n\n\n\n\nvar options = {\n    key: fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync('/etc/letsencrypt/live/sayore.de/privkey.pem', 'utf8'),\n    cert: fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync('/etc/letsencrypt/live/sayore.de/cert.pem', 'utf8'),\n    ca: fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync('/etc/letsencrypt/live/sayore.de/chain.pem', 'utf8')\n};\nvar version = 1;\nvar versionFilePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../version');\nif (fs__WEBPACK_IMPORTED_MODULE_3___default().existsSync(versionFilePath)) {\n    version = Number(fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(versionFilePath, 'utf8'));\n    version++;\n    fs__WEBPACK_IMPORTED_MODULE_3___default().writeFileSync(versionFilePath, version + \"\", 'utf8');\n}\nelse {\n    fs__WEBPACK_IMPORTED_MODULE_3___default().writeFileSync(versionFilePath, version + \"\", 'utf8');\n}\nvar app = express__WEBPACK_IMPORTED_MODULE_1__();\nvar https = __webpack_require__(/*! https */ \"https\");\nvar server = https.createServer(options, app);\nvar io = new socket_io__WEBPACK_IMPORTED_MODULE_4__.Server(server, {\n    maxHttpBufferSize: 5e4,\n    cookie: true,\n    serveClient: true\n});\napp.set('view engine', 'ejs');\nvar eHTTPServer = /** @class */ (function () {\n    function eHTTPServer() {\n    }\n    eHTTPServer.start = function () {\n        var _this = this;\n        app.get('/', function (req, res) {\n            res.render(path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../index.ejs'), { version: version });\n        });\n        app.use(function (req, res, next) {\n            next();\n        });\n        app.use(express__WEBPACK_IMPORTED_MODULE_1__.static(path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../')));\n        app.use(\"/sprite\", express__WEBPACK_IMPORTED_MODULE_1__.static(path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, '../assets')));\n        this.io = io;\n        io.on(\"connection\", function (socket) {\n            // Client tells us he already has an UUID\n            if (socket.handshake.query.requestedUUID != \"undefined\") {\n                // Check if uuid is in db\n                var player = _database__WEBPACK_IMPORTED_MODULE_7__.permanentDatabase.prepare(\"SELECT * FROM player WHERE uuid=?\")\n                    .get([socket.handshake.query.requestedUUID]);\n                // If we find the UUID, everything is fine, give the Player the UUID he wanted.\n                if (player != undefined) {\n                    _this.game.add(new _game_entities_player__WEBPACK_IMPORTED_MODULE_5__.Player(socket.handshake.query.requestedUUID, socket));\n                    console.log(\"Player rejoined! (\" + socket.handshake.query.requestedUUID + \")\");\n                } // UUID was not found, we will create a new one in this case and put it into DB.\n                else {\n                    console.log(\"Player requested an uuid that does not exist! (\" + socket.handshake.query.requestedUUID + \")\");\n                    var playersUUID = cuid__WEBPACK_IMPORTED_MODULE_0___default()();\n                    _this.game.add(new _game_entities_player__WEBPACK_IMPORTED_MODULE_5__.Player(playersUUID, socket));\n                    _database__WEBPACK_IMPORTED_MODULE_7__.permanentDatabase.prepare(\"INSERT INTO player(uuid) VALUES(?)\")\n                        .run([playersUUID]);\n                    console.log(\"Created new Player with UUID \" + playersUUID);\n                }\n                // Create Player \n            }\n            else {\n                // User has not send an UUID with it's request. \n                // We create a new UUID, and save it into DB.\n                console.log(\"Player joined!\");\n                var playersUUID = cuid__WEBPACK_IMPORTED_MODULE_0___default()();\n                _this.game.add(new _game_entities_player__WEBPACK_IMPORTED_MODULE_5__.Player(playersUUID, socket));\n                _database__WEBPACK_IMPORTED_MODULE_7__.permanentDatabase.prepare(\"INSERT INTO player(uuid) VALUES(?)\")\n                    .run([playersUUID]);\n            }\n            socket.join('main');\n            socket.emit(\"00\", { room: \"main\", uuid: playersUUID, ok: 200, uni: Math.floor(Math.random() * 10000000) });\n        });\n        server.listen(443, function () {\n            console.log(\"\\u26A1\\uFE0F[server]: Server is running at https://sayore.de:\" + 443);\n        });\n    };\n    eHTTPServer.game = new _game_game__WEBPACK_IMPORTED_MODULE_6__.Game();\n    return eHTTPServer;\n}());\n\n\n\n//# sourceURL=webpack:///./server/lib/httpserver.ts?");

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

/***/ "./server/packets/09_chunk.ts":
/*!************************************!*\
  !*** ./server/packets/09_chunk.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ChunkPacket\": () => (/* binding */ ChunkPacket)\n/* harmony export */ });\n/* harmony import */ var _lib_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/database */ \"./server/lib/database.ts\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./server/packets/base.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar ChunkPacket = /** @class */ (function (_super) {\n    __extends(ChunkPacket, _super);\n    function ChunkPacket() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    ChunkPacket.prototype.handle = function (chunkRequest) {\n        //var retChunk = new Chunk()\n        //retChunk.globalPosition=chunkRequest.ChunkPosition;\n        //retChunk.tileset=1;\n        //retChunk.chunkSize=3;\n        var data = _lib_database__WEBPACK_IMPORTED_MODULE_0__.permanentDatabase.prepare(\"SELECT data FROM chunks WHERE x = ? AND y = ?\")\n            .get([chunkRequest.ChunkPosition.x,\n            chunkRequest.ChunkPosition.y\n        ]);\n        this.player.socket.emit(\"09cb\", data);\n        ////permanentDatabase.prepare(\"SELECT * FROM chunks WHERE \")\n        //this.player.socket.emit(\"10\",retChunk.serialize())\n        //console.log(\"Player rerequested Chunk \"+ JSON.stringify(chunkRequest.ChunkPosition));\n    };\n    ChunkPacket.prototype.send = function (socket, message) {\n    };\n    return ChunkPacket;\n}(_base__WEBPACK_IMPORTED_MODULE_1__.BasePacket));\n\n\n\n//# sourceURL=webpack:///./server/packets/09_chunk.ts?");

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

/***/ "./server/tests/sql.ts":
/*!*****************************!*\
  !*** ./server/tests/sql.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SQLTest\": () => (/* binding */ SQLTest)\n/* harmony export */ });\n/* harmony import */ var _lib_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/database */ \"./server/lib/database.ts\");\n\nvar SQLTest = function () {\n    console.log((new _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Table(\"testcanneverexist\").fields.length == 0 ? \"✅ Table that never should exist, has no fields. \" : \"Table that never exists is either undefined or filled???\"));\n    var chunksTable = new _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Table(\"thisisalsoatablethatisdeadmeat\");\n    if (chunksTable.exists()) {\n        //chunksTable.delete() \n        //console.log(\"✅ Deleting 'thisisalsoatablethatisdeadmeat' table.\")\n    }\n    chunksTable\n        .addField(\"uuid\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.VARCHAR, 64)\n        .addField(\"x\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.INT)\n        .addField(\"y\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.INT)\n        .addField(\"data\", _lib_database__WEBPACK_IMPORTED_MODULE_0__.SQL.Fieldtype.TEXT)\n        .createOrUpdateTable()\n        .addIndex([\"x\", \"y\"], \"spartialindex\", true);\n    var fieldlength = chunksTable.getTableInfo().length == 4;\n    console.log((fieldlength) ? \"✅ Fields are correct!\" : \"Fieldlength is not correct\");\n    var indexlength = chunksTable.getIndexInfo().length == 1;\n    console.log((indexlength) ? \"✅ Indexes are correct!\" : \"Indexlength is not correct \\n\", chunksTable.getIndexInfo());\n    var myChunk = chunksTable.where(\"x=4 AND y=2\");\n    console.log((fieldlength && indexlength) ? \"✅ SQLTest's succesful\" : \"SQLTest's failed\");\n};\n\n\n//# sourceURL=webpack:///./server/tests/sql.ts?");

/***/ }),

/***/ "./server/tests/test.ts":
/*!******************************!*\
  !*** ./server/tests/test.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Test\": () => (/* binding */ Test)\n/* harmony export */ });\n/* harmony import */ var _sql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sql */ \"./server/tests/sql.ts\");\n\nvar Test = /** @class */ (function () {\n    function Test() {\n    }\n    Test.test = function () {\n        console.log((Test.silent ? \"Tests are silent.\" : \"Tests are not silent.\"));\n        (0,_sql__WEBPACK_IMPORTED_MODULE_0__.SQLTest)();\n    };\n    Test.silent = false;\n    return Test;\n}());\n\n\n\n//# sourceURL=webpack:///./server/tests/test.ts?");

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