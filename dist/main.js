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
eval("__webpack_require__.r(__webpack_exports__);\n// import './polyfill.js';\n\nfunction CanvasSprite({\n  canvas,\n  imageUrl,\n  width,\n  height,\n  frames,\n  fps,\n  loop = true,\n  onEnd,\n  onLoop\n}) {\n  let context = canvas.getContext('2d');\n  canvas.width = width;\n  canvas.height = height;\n\n  let reqId = null;\n\n  let spriteImg = new Image();\n  spriteImg.onload = () => {\n    let now = 0;\n    let then = Date.now();\n    let fpsInterval = 1000 / fps;\n    let delta = 0;\n\n    let frameIndex = 0;\n    let spriteWidth = width * frames;\n    let spriteHeight = height;\n\n    let loopCount = 0;\n\n    function renderFrame() {\n      if (frameIndex < frames - 1) {\n        frameIndex += 1;\n      } else {\n        if (loop) {\n          frameIndex = 0;\n          loopCount++;\n          onLoop && onLoop(loopCount);\n        } else {\n          window.cancelAnimationFrame(reqId);\n          onEnd && onEnd();\n        }\n      }\n      context.clearRect(0, 0, spriteWidth, height);\n      context.drawImage(\n        spriteImg,\n        (frameIndex * spriteWidth) / frames,\n        0,\n        spriteWidth / frames,\n        spriteHeight,\n        0,\n        0,\n        spriteWidth / frames,\n        spriteHeight\n      );\n    }\n\n    function spriteLoop() {\n      reqId = window.requestAnimationFrame(spriteLoop);\n      now = Date.now();\n      delta = now - then;\n      if (delta > fpsInterval) {\n        then = now - (delta % fpsInterval);\n        renderFrame();\n      }\n    }\n    renderFrame();\n    spriteLoop();\n  };\n  spriteImg.src = imageUrl;\n\n  function destroy() {\n    if (reqId) {\n      window.cancelAnimationFrame(reqId);\n    }\n    reqId = null;\n    canvas = null;\n    context = null;\n    spriteImg = null;\n  }\n  return {\n    destroy\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasSprite);\n\n\n//# sourceURL=webpack://CanvasSprite/./src/index.js?");

/***/ })

/******/ })["default"];
});