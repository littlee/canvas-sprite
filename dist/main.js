(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CanvasSprite"] = factory();
	else
		root["CanvasSprite"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// import './polyfill.js';\n\nfunction CanvasSprite(config) {\n  var canvas = config.canvas;\n  var canvasContext = canvas.getContext('2d');\n  canvas.width = config.width;\n  canvas.height = config.height;\n\n  var sprite = null;\n  var spriteImg = new Image();\n\n  var now;\n  var then = Date.now();\n  var fpsInterval = 1000 / config.fps;\n  var delta;\n\n  var reqId = null;\n\n  function spriteLoop() {\n    reqId = window.requestAnimationFrame(spriteLoop);\n    now = Date.now();\n    delta = now - then;\n    if (delta > fpsInterval) {\n      then = now - (delta % fpsInterval);\n      sprite.update();\n      sprite.render();\n    }\n  }\n\n  function createSprite(options) {\n    var that = {};\n    var frameIndex = 0;\n    var numberOfFrames = options.numberOfFrames || 1;\n\n    that.context = options.context;\n    that.width = options.width;\n    that.height = options.height;\n    that.image = options.image;\n\n    that.update = function() {\n      if (frameIndex < numberOfFrames - 1) {\n        frameIndex += 1;\n      } else {\n        frameIndex = 0;\n      }\n    };\n\n    that.render = function() {\n      that.context.clearRect(0, 0, that.width, that.height);\n      that.context.drawImage(\n        that.image,\n        (frameIndex * that.width) / numberOfFrames,\n        0,\n        that.width / numberOfFrames,\n        that.height,\n        0,\n        0,\n        that.width / numberOfFrames,\n        that.height\n      );\n    };\n\n    return that;\n  }\n\n  sprite = createSprite({\n    context: canvasContext,\n    width: config.width * config.frames,\n    height: config.height,\n    image: spriteImg,\n    numberOfFrames: config.frames,\n  });\n\n  spriteImg.addEventListener('load', function() {\n    sprite.update();\n    sprite.render();\n    spriteLoop();\n  });\n  spriteImg.src = config.imageUrl;\n\n  return {\n    destroy: function() {\n      if (reqId) {\n        window.cancelAnimationFrame(reqId);\n      }\n      canvas = null;\n      canvasContext = null;\n      sprite = null;\n      spriteImg = null;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasSprite);\n\n\n//# sourceURL=webpack://CanvasSprite/./src/index.js?");

/***/ })

/******/ })["default"];
});