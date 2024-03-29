/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/ext/MathExt.ts":
/*!****************************!*\
  !*** ./lib/ext/MathExt.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MathExt\": () => (/* binding */ MathExt)\n/* harmony export */ });\nvar MathExt = /** @class */ (function () {\n    function MathExt() {\n    }\n    MathExt.clamp = function (num, min, max) { return Math.min(Math.max(num, min), max); };\n    return MathExt;\n}());\n\n\n\n//# sourceURL=webpack:///./lib/ext/MathExt.ts?");

/***/ }),

/***/ "./lib/test.ts":
/*!*********************!*\
  !*** ./lib/test.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _types_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/Vector */ \"./lib/types/Vector.ts\");\n\nvar TestGroups;\n(function (TestGroups) {\n    TestGroups[TestGroups[\"Vector\"] = 0] = \"Vector\";\n    TestGroups[TestGroups[\"Atan2\"] = 1] = \"Atan2\";\n})(TestGroups || (TestGroups = {}));\nvar testGroup = TestGroups.Vector;\nif (testGroup == TestGroups.Vector) {\n    var test = new _types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(510, 125);\n    for (var i = 0; i < 65535; i++) {\n        test.x = i;\n        test.y = i;\n        //console.log(test,\" - \" , Vector.deserializeFrom2char(test.serializeInto2char()));\n        if (localStorage.getItem(\"vect\" + i) == null) {\n            localStorage.setItem(\"vect\" + i, (test.serializeInto2char()));\n        }\n        else {\n            var item = localStorage.getItem(\"vect\" + i);\n            if (item == null) {\n                console.log(\"NULL\" + \"vect\" + i);\n            }\n            if (_types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.deserializeFrom2char(localStorage.getItem(\"vect\" + i)).x != i) {\n                console.log(\"BROKE\" + \" vect\" + i + \" \" + JSON.stringify(_types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.deserializeFrom2char(localStorage.getItem(\"vect\" + i))));\n            }\n        }\n    }\n    //let test = new Vector(510,125)\n    for (var i = 0; i < 65535; i++) {\n        test.x = i;\n        test.y = i;\n        //console.log(test,\" - \" , Vector.deserializeFrom2char(test.serializeInto2char()));\n        if (_types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.deserializeFrom2char(test.serializeInto2char()).x != i) {\n            console.log(\"BROKE\");\n        }\n    }\n    console.log(\"Done testing.\");\n}\n//@ts-ignore\nif (testGroup == TestGroups.Atan2) {\n    var tests = 1000;\n    var v1000vectors = [];\n    for (var i = 0; i < 1000; i++) {\n        v1000vectors.push(new _types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(Math.random(), Math.random()));\n    }\n    var v1000vectors2 = [];\n    for (var i = 0; i < 1000; i++) {\n        v1000vectors2.push(new _types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(Math.random(), Math.random()));\n    }\n    var results = [];\n    var result = 0;\n    console.log(\"Full(self): \");\n    before = performance.now();\n    for (var j = 0; j < tests; j++)\n        for (var i = 0; i < v1000vectors.length; i++) {\n            var lookingDir2 = _types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.rotateByEightOfPi(_types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sub(v1000vectors[i], v1000vectors2[i])).directionTo4D();\n            results.push(lookingDir);\n        }\n    console.log(performance.now() - before);\n    console.log(\"Atan2:      \");\n    var before = performance.now();\n    for (var j = 0; j < tests; j++)\n        for (var i = 0; i < v1000vectors.length; i++) {\n            var lookingDir = v1000vectors[i].directionToDeg(v1000vectors2[i]);\n            results.push(lookingDir);\n        }\n    console.log(performance.now() - before);\n    console.log(\"Full(Atan2):      \");\n    var before = performance.now();\n    for (var j = 0; j < tests; j++)\n        for (var i = 0; i < v1000vectors.length; i++) {\n            var lookingDir = v1000vectors[i].directionToDeg(v1000vectors2[i]);\n            if (lookingDir <= 45 && lookingDir >= -45) {\n                result = 0; // Right\n            }\n            else if (lookingDir >= 45 && lookingDir <= 90 + 45) {\n                result = 1; //Down\n            }\n            else if (lookingDir >= 180 - 45 && lookingDir <= 180 + 45 || lookingDir == 0) {\n                result = 2; //Left\n            }\n            else {\n                //Up\n                result = 3; // Up\n            }\n            results.push(result);\n        }\n    console.log(performance.now() - before);\n    console.log(\"Full(self w elsif): \");\n    before = performance.now();\n    for (var j = 0; j < tests; j++)\n        for (var i = 0; i < v1000vectors.length; i++) {\n            var lookingDir2 = _types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.rotateByEightOfPi(_types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sub(v1000vectors[i], v1000vectors2[i])).directionTo4D();\n            if (lookingDir2.x == 1 && lookingDir2.y == 1) {\n                result = 0; // Right\n            }\n            else if (lookingDir2.x == -1 && lookingDir2.y == 1) {\n                result = 1; //Down\n            }\n            else if (lookingDir2.x == -1 && lookingDir2.y == -1) {\n                result = 2; //Left\n            }\n            else {\n                //Up\n                result = 3; // Up\n            }\n            results.push(result);\n        }\n    console.log(performance.now() - before);\n    console.log(\"rotateBy8: \");\n    before = performance.now();\n    for (var j = 0; j < tests; j++)\n        for (var i = 0; i < v1000vectors.length; i++) {\n            var lookingDir3 = _types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.rotateByEightOfPi(v1000vectors[i]);\n            results.push(lookingDir3);\n        }\n    console.log(performance.now() - before);\n    console.log(\"static sub: \");\n    before = performance.now();\n    for (var j = 0; j < tests; j++) {\n        for (var i = 0; i < v1000vectors.length; i++) {\n            var lookingDir4 = _types_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sub(v1000vectors[i], v1000vectors2[i]);\n            results.push(lookingDir4);\n        }\n    }\n    console.log(performance.now() - before);\n    console.log(\"Tests ended. \" + results.length);\n}\n\n\n//# sourceURL=webpack:///./lib/test.ts?");

/***/ }),

/***/ "./lib/types/Vector.ts":
/*!*****************************!*\
  !*** ./lib/types/Vector.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector)\n/* harmony export */ });\n/* harmony import */ var _ext_MathExt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ext/MathExt */ \"./lib/ext/MathExt.ts\");\n\nvar Vector = /** @class */ (function () {\n    function Vector(x, y) {\n        if (x === void 0) { x = 0; }\n        this.x = x;\n        this.y = y;\n        if (x != 0 && y == undefined)\n            this.y = x;\n    }\n    Vector.prototype.negate = function () {\n        this.x = -this.x;\n        this.y = -this.y;\n        return this;\n    };\n    Object.defineProperty(Vector, \"Zero\", {\n        get: function () { return this._Zero; },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Vector, \"One\", {\n        get: function () { return this._One; },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Vector, \"Up\", {\n        get: function () { return this._Up; },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Vector, \"Left\", {\n        get: function () { return this._Left; },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Vector, \"Down\", {\n        get: function () { return this._Down; },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Vector, \"Right\", {\n        get: function () { return this._Right; },\n        enumerable: false,\n        configurable: true\n    });\n    Vector.add = function (a, b) { return new Vector(a.x + b.x, a.y + b.y); };\n    Vector.sub = function (a, b) { return new Vector(a.x - b.x, a.y - b.y); };\n    Vector.mul = function (a, b) { return new Vector(a.x * b.x, a.y * b.y); };\n    Vector.div = function (a, b) { return new Vector(a.x / b.x, a.y / b.y); };\n    Vector.mod = function (a, b) { return new Vector(a.x % b.x, a.y % b.y); };\n    Vector.addNumber = function (a, b) { return new Vector(a.x + b, a.y + b); };\n    Vector.subNumber = function (a, b) { return new Vector(a.x - b, a.y - b); };\n    Vector.mulNumber = function (a, b) { return new Vector(a.x * b, a.y * b); };\n    Vector.divNumber = function (a, b) { return new Vector(a.x / b, a.y / b); };\n    Vector.modNumber = function (a, b) { return new Vector(a.x % b, a.y % b); };\n    Vector.atan2 = function (a) { return Math.atan2(a.y, a.x); };\n    /**\n     * Returns radian Direction from a to b.\n     * @param a\n     * @param b\n     * @returns\n     */\n    Vector.direction = function (a, b) { return Math.atan2(b.y - a.y, b.x - a.x); };\n    /**\n     * Even though these functions have callback, the original WILL be modified.\n     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.\n     * @param a Vector to add to this one.\n     * @returns this\n     */\n    Vector.prototype.add = function (a) { this.x = this.x + a.x; this.y = this.y + a.y; return this; };\n    /**\n     * Even though these functions have callback, the original WILL be modified.\n     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.\n     * @param a number to add to this one.\n     * @returns this\n     */\n    Vector.prototype.addNumber = function (a) { this.x = this.x + a; this.y = this.y + a; return this; };\n    /**\n     * Even though these functions have callback, the original WILL be modified.\n     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.\n     * @param a Vector to mul to this one.\n     * @returns this\n     */\n    Vector.prototype.mul = function (a) { this.x = this.x * a.x; this.y = this.y * a.y; return this; };\n    /**\n     * Even though these functions have callback, the original WILL be modified.\n     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.\n     * @param a number to mul to this one.\n     * @returns this\n     */\n    Vector.prototype.mulNumber = function (a) { this.x = this.x * a; this.y = this.y * a; return this; };\n    /**\n     * Even though these functions have callback, the original WILL be modified.\n     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.\n     * @param a Vector to sub from this one.\n     * @returns this\n     */\n    Vector.prototype.sub = function (a) { this.x = this.x - a.x; this.y = this.y - a.y; return this; };\n    /**\n     * Even though these functions have callback, the original WILL be modified.\n     * Use Vector's static functions to not modify original Values, or rather use a clone for calculation.\n     * @param a number to sub from this one.\n     * @returns this\n     */\n    Vector.prototype.subNumber = function (a) { this.x = this.x - a; this.y = this.y - a; return this; };\n    Vector.prototype.div = function (a) { this.x = this.x / a.x; this.y = this.y / a.y; return this; };\n    Vector.prototype.divNumber = function (a) { this.x = this.x / a; this.y = this.y / a; return this; };\n    Vector.prototype.mod = function (a) { this.x = this.x % a.x; this.y = this.y % a.y; return this; };\n    Vector.prototype.modNumber = function (a) { this.x = this.x % a; this.y = this.y % a; return this; };\n    /**\n     * Normalizes this vector.\n     * @returns this\n     */\n    Vector.prototype.normalize = function () {\n        var len = this.length();\n        if (len > 0) {\n            this.scale(1 / len);\n        }\n        return this;\n    };\n    ;\n    Vector.prototype.length = function () {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    };\n    ;\n    /**\n     * Returns the radian direction from this to target Vector..\n     * @param target Vector to look at.\n     * @returns\n     */\n    Vector.prototype.directionTo = function (target) {\n        return Math.atan2(target.y - this.y, target.x - this.x);\n    };\n    ;\n    /**\n     * Returns the radian direction from this to target Vector..\n     * @param target Vector to look at.\n     * @returns\n     */\n    Vector.prototype.directionToDeg = function (target) {\n        return (Math.atan2(target.y - this.y, target.x - this.x) / (Math.PI * 2)) * 360;\n    };\n    ;\n    /**\n     * Vector will be rotated 45 degree to the right.\n     * @param a the Vector\n     */\n    Vector.rotateByEightOfPi = function (a) {\n        return a.mul(this.eigthOfPiRadian);\n    };\n    /**\n     * Faster Direction calulcation for UpLeft, UpRight, DownUp and DownRight approximation. (rotate by45deg, to instead get 4D L,R,U,D)\n     */\n    Vector.prototype.directionTo4D = function () {\n        return new Vector((this.x == 0 ? 0 : (this.x < 0 ? 1 : -1)), (this.y == 0 ? 0 : (this.y < 0 ? 1 : -1)));\n    };\n    Vector.prototype.scale = function (f) {\n        this.x *= f;\n        this.y *= f;\n        return this;\n    };\n    ;\n    /**\n     * Calculates the distance(1d) to the other Vector.\n     * @param target Vector to look at.\n     * @returns\n     */\n    Vector.prototype.distance = function (target) {\n        var a = this.x - target.x;\n        var b = this.y - target.y;\n        return Math.sqrt(a * a + b * b);\n    };\n    ;\n    /**\n     * Calculates the distance(1d) to the other Vector.\n     * @param target Vector to look at.\n     * @returns\n     */\n    Vector.prototype.round = function () {\n        this.x = Math.round(this.x);\n        this.y = Math.round(this.y);\n        return this;\n    };\n    ;\n    Vector.prototype.clamp = function (clamtorMin, clamptorMax) {\n        this.x = _ext_MathExt__WEBPACK_IMPORTED_MODULE_0__.MathExt.clamp(this.x, clamtorMin.x, clamptorMax.x);\n        this.y = _ext_MathExt__WEBPACK_IMPORTED_MODULE_0__.MathExt.clamp(this.y, clamtorMin.y, clamptorMax.y);\n        return this;\n    };\n    /**\n     * Calculates the distance(1d) to the other Vector.\n     * @param target Vector to look at.\n     * @returns\n     */\n    Vector.prototype.floor = function () {\n        this.x = Math.floor(this.x);\n        this.y = Math.floor(this.y);\n        return this;\n    };\n    ;\n    /**\n     * Calculates the distance(1d) to the other Vector.\n     * @param target Vector to look at.\n     * @returns\n     */\n    Vector.prototype.ceil = function () {\n        this.x = Math.ceil(this.x);\n        this.y = Math.ceil(this.y);\n        return this;\n    };\n    ;\n    /**\n     * Calculates the distance(1d) to the other Vector.\n     * @param target Vector to look at.\n     * @returns\n     */\n    Vector.prototype.distanceSqrt = function (target) {\n        var a = this.x - target.x;\n        var b = this.y - target.y;\n        return a * a + b * b;\n    };\n    ;\n    /**\n     * For a given vector it returns a copied version.\n     * @param {Vector2} vector Vector to clone.\n     * @returns {Vector2}\n    \n     */\n    Vector.prototype.clone = function () {\n        return new Vector(this.x, this.y);\n    };\n    /**\n     * Serializes a Vector(which needs to be Int!!), into a 2 character wide String.\n     * Maximum size of an serialized Vector in this format is 65535.\n     * Everything larger will result in undefined behaviour.\n     * @returns\n     */\n    Vector.prototype.serializeInto2char = function () {\n        return String.fromCharCode(this.x) + String.fromCharCode(this.y);\n    };\n    Vector.prototype.deserializeFrom2char = function (data) {\n        this.x = data.charCodeAt(0);\n        this.y = data.charCodeAt(1);\n    };\n    Vector.deserializeFrom2char = function (data) {\n        var retVec = new Vector(0, 0);\n        retVec.deserializeFrom2char(data);\n        return retVec;\n    };\n    Vector.prototype.asString = function () {\n        return this.x.toFixed(2) + \", \" + this.y.toFixed(2);\n    };\n    Vector._Zero = new Vector(0, 0);\n    Vector._One = new Vector(1, 1);\n    Vector._Up = new Vector(0, -1);\n    Vector._Left = new Vector(-1, 0);\n    Vector._Down = new Vector(0, 1);\n    Vector._Right = new Vector(1, 0);\n    Vector.eigthOfPiRadian = new Vector(Math.sin(Math.PI / 8), Math.cos(Math.PI / 8));\n    return Vector;\n}());\n\n\n\n//# sourceURL=webpack:///./lib/types/Vector.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/test.ts");
/******/ 	
/******/ })()
;