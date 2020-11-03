!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.CanvasSprite=r():e.CanvasSprite=r()}(window,(function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";t.r(r),t.d(r,"loadImage",(function(){return i}));var n=function(e){if(!e||"string"!=typeof e)throw new Error("url is required and should be string");if(!/^data:/.test(e)){var r=document.createElement("a");return r.href=e,r.origin!==window.location.origin}return!1};var o=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:60;if("function"!=typeof e)throw Error("cb should be function");if("number"!=typeof r)throw Error("fps should be number");if(r<1||r>60)throw Error("fps should be in range of [1, 60]");var t=parseInt(1e3/Math.min(r,60)),n=null,o=performance.now();function i(r){n=requestAnimationFrame(i),r-o>=t&&(e(),o=r)}return n=requestAnimationFrame(i),{cancel:function(){cancelAnimationFrame(n)}}};function i(e){return new Promise((function(r,t){var o=new Image;n(e)&&(o.crossOrigin="anonymous"),o.onload=function(){r(o)},o.onerror=function(){t(Error("".concat(e," load failed")))},o.src=e}))}function u(e){return"number"==typeof e&&parseInt(e)===e}function a(e){var r=e.canvas,t=e.imageUrl,n=e.frames,a=e.fps,f=void 0===a?12:a,c=e.loop,d=void 0===c||c,s=e.onEnd,l=e.onLoop;if(!r)throw new Error("canvas is required");if(!t)throw new Error("imageUrl is required");if(!u(n))throw new Error("frames is required and should be integer");if(!u(f))throw new Error("fps is required and should be integer");if(r.hasAttribute("data-cs-id"))throw new Error("the canvas has sprite with it, call .destroy() first");r.setAttribute("data-cs-id","cs-".concat(Date.now()));var p=!1,h=0,m=null,w=r.getContext("2d"),b=null;function g(){if(b){var e=b.width,t=b.height;h<n&&(w.clearRect(0,0,r.width,r.height),w.drawImage(b,h*e/n,0,e/n,t,0,0,e/n,t)),++h===n&&(d?(h=0,l&&l()):(m.cancel(),s&&s()))}}function v(e){r.width=e.width/n,r.height=e.height,b=e,g(),m=o((function(){p||g()}),f)}return t instanceof Image?v(t):i(t).then((function(e){v(e)})),{play:function(){p=!1},pause:function(){p=!0},stop:function(){p=!0,h=0,g()},destroy:function(){m&&m.cancel(),w&&w.clearRect(0,0,r.width,r.height),r&&r.removeAttribute("data-cs-id")}}}a.loadImage=i;r.default=a}]).default}));