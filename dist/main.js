!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CanvasSprite=e():t.CanvasSprite=e()}(window,(function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=4)}([function(t,e,o){"use strict";(function(e){var n=o(2),r=o(3),a=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,i=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,s=new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");function u(t){return(t||"").toString().replace(s,"")}var c=[["#","hash"],["?","query"],function(t){return t.replace("\\","/")},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d+)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],l={hash:1,query:1};function f(t){var o,n=("undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{}).location||{},r={},i=typeof(t=t||n);if("blob:"===t.protocol)r=new h(unescape(t.pathname),{});else if("string"===i)for(o in r=new h(t,{}),l)delete r[o];else if("object"===i){for(o in t)o in l||(r[o]=t[o]);void 0===r.slashes&&(r.slashes=a.test(t.href))}return r}function p(t){t=u(t);var e=i.exec(t);return{protocol:e[1]?e[1].toLowerCase():"",slashes:!!e[2],rest:e[3]}}function h(t,e,o){if(t=u(t),!(this instanceof h))return new h(t,e,o);var a,i,s,l,d,w,m=c.slice(),y=typeof e,v=this,g=0;for("object"!==y&&"string"!==y&&(o=e,e=null),o&&"function"!=typeof o&&(o=r.parse),e=f(e),a=!(i=p(t||"")).protocol&&!i.slashes,v.slashes=i.slashes||a&&e.slashes,v.protocol=i.protocol||e.protocol||"",t=i.rest,i.slashes||(m[3]=[/(.*)/,"pathname"]);g<m.length;g++)"function"!=typeof(l=m[g])?(s=l[0],w=l[1],s!=s?v[w]=t:"string"==typeof s?~(d=t.indexOf(s))&&("number"==typeof l[2]?(v[w]=t.slice(0,d),t=t.slice(d+l[2])):(v[w]=t.slice(d),t=t.slice(0,d))):(d=s.exec(t))&&(v[w]=d[1],t=t.slice(0,d.index)),v[w]=v[w]||a&&l[3]&&e[w]||"",l[4]&&(v[w]=v[w].toLowerCase())):t=l(t);o&&(v.query=o(v.query)),a&&e.slashes&&"/"!==v.pathname.charAt(0)&&(""!==v.pathname||""!==e.pathname)&&(v.pathname=function(t,e){if(""===t)return e;for(var o=(e||"/").split("/").slice(0,-1).concat(t.split("/")),n=o.length,r=o[n-1],a=!1,i=0;n--;)"."===o[n]?o.splice(n,1):".."===o[n]?(o.splice(n,1),i++):i&&(0===n&&(a=!0),o.splice(n,1),i--);return a&&o.unshift(""),"."!==r&&".."!==r||o.push(""),o.join("/")}(v.pathname,e.pathname)),n(v.port,v.protocol)||(v.host=v.hostname,v.port=""),v.username=v.password="",v.auth&&(l=v.auth.split(":"),v.username=l[0]||"",v.password=l[1]||""),v.origin=v.protocol&&v.host&&"file:"!==v.protocol?v.protocol+"//"+v.host:"null",v.href=v.toString()}h.prototype={set:function(t,e,o){var a=this;switch(t){case"query":"string"==typeof e&&e.length&&(e=(o||r.parse)(e)),a[t]=e;break;case"port":a[t]=e,n(e,a.protocol)?e&&(a.host=a.hostname+":"+e):(a.host=a.hostname,a[t]="");break;case"hostname":a[t]=e,a.port&&(e+=":"+a.port),a.host=e;break;case"host":a[t]=e,/:\d+$/.test(e)?(e=e.split(":"),a.port=e.pop(),a.hostname=e.join(":")):(a.hostname=e,a.port="");break;case"protocol":a.protocol=e.toLowerCase(),a.slashes=!o;break;case"pathname":case"hash":if(e){var i="pathname"===t?"/":"#";a[t]=e.charAt(0)!==i?i+e:e}else a[t]=e;break;default:a[t]=e}for(var s=0;s<c.length;s++){var u=c[s];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.origin=a.protocol&&a.host&&"file:"!==a.protocol?a.protocol+"//"+a.host:"null",a.href=a.toString(),a},toString:function(t){t&&"function"==typeof t||(t=r.stringify);var e,o=this,n=o.protocol;n&&":"!==n.charAt(n.length-1)&&(n+=":");var a=n+(o.slashes?"//":"");return o.username&&(a+=o.username,o.password&&(a+=":"+o.password),a+="@"),a+=o.host+o.pathname,(e="object"==typeof o.query?t(o.query):o.query)&&(a+="?"!==e.charAt(0)?"?"+e:e),o.hash&&(a+=o.hash),a}},h.extractProtocol=p,h.location=f,h.trimLeft=u,h.qs=r,t.exports=h}).call(this,o(1))},function(t,e){var o;o=function(){return this}();try{o=o||new Function("return this")()}catch(t){"object"==typeof window&&(o=window)}t.exports=o},function(t,e,o){"use strict";t.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},function(t,e,o){"use strict";var n=Object.prototype.hasOwnProperty;function r(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(t){return null}}e.stringify=function(t,e){e=e||"";var o,r,a=[];for(r in"string"!=typeof e&&(e="?"),t)if(n.call(t,r)){if((o=t[r])||null!=o&&!isNaN(o)||(o=""),r=encodeURIComponent(r),o=encodeURIComponent(o),null===r||null===o)continue;a.push(r+"="+o)}return a.length?e+a.join("&"):""},e.parse=function(t){for(var e,o=/([^=?&]+)=?([^&]*)/g,n={};e=o.exec(t);){var a=r(e[1]),i=r(e[2]);null===a||null===i||a in n||(n[a]=i)}return n}},function(t,e,o){"use strict";o.r(e);var n=o(0),r=o.n(n);var a=function(t){if(!t||"string"!=typeof t)throw new Error("url is required and should be string");return!/^data:/.test(t)&&new r.a(t).origin!==window.location.origin};e.default=function(t){var e=t.canvas,o=t.imageUrl,n=t.frames,r=t.fps,i=t.loop,s=void 0===i||i,u=t.onEnd,c=t.onLoop;if(e.hasAttribute("data-cs-id"))throw new Error("the canvas has sprite with it, call .destroy() first");e.setAttribute("data-cs-id","cs-".concat(Date.now()));var l,f=e.getContext("2d"),p=null,h=!1,d=0,w=null,m=0,y=0,v=0,g=1e3/r,b=0;function x(){p=window.requestAnimationFrame(x),!h&&w&&(y=Date.now(),(b=y-v)>=g&&(v=y-b%g,j(),d===n-1?s?(d=0,m++,c&&c(m)):(h=!0,window.cancelAnimationFrame(p),u&&u()):d+=1))}function j(){var t=w.width,e=w.height;d<n&&(f.clearRect(0,0,t,e),f.drawImage(w,d*t/n,0,t/n,e,0,0,t/n,e))}return(l=o,new Promise((function(t,e){var o=new Image;a(l)&&(o.crossOrigin="anonymous"),o.onload=function(){t(o)},o.onerror=function(){e(Error("load ".concat(l," error")))},o.src=l}))).then((function(t){w=t;var o=t.width/n,r=t.height;e&&(e.width=o,e.height=r,v=Date.now(),j(),x())})),{play:function(){h=!1},pause:function(){h=!0},stop:function(){h=!0,d=0,j()},destroy:function(){h=!1,w=null,p&&window.cancelAnimationFrame(p),f&&f.clearRect(0,0,e.width,e.height),e&&e.removeAttribute("data-cs-id"),p=null,f=null,e=null}}}}]).default}));