!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CanvasSprite=t():e.CanvasSprite=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),t.default=function(e){var t=e.canvas;t.width=e.width,t.height=e.height;var n,r,o=null,i=new Image,u=Date.now(),a=1e3/e.fps,f=null;function d(){f=window.requestAnimationFrame(d),n=Date.now(),(r=n-u)>a&&(u=n-r%a,o.update(),o.render())}return o=function(e){var t={},n=0,r=e.numberOfFrames||1;return t.context=e.context,t.width=e.width,t.height=e.height,t.image=e.image,t.update=function(){n<r-1?n+=1:n=0},t.render=function(){t.context.clearRect(0,0,t.width,t.height),t.context.drawImage(t.image,n*t.width/r,0,t.width/r,t.height,0,0,t.width/r,t.height)},t}({context:t.getContext("2d"),width:e.width*e.frames,height:e.height,image:i,numberOfFrames:e.frames}),i.addEventListener("load",function(){o.update(),o.render(),d()}),i.src=e.imageUrl,{destroy:function(){t=null,o=null,i=null,f&&window.cancelAnimationFrame(f)}}}}]).default});