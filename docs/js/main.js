!function e(t,n,c){function i(o,a){if(!n[o]){if(!t[o]){var u="function"==typeof require&&require;if(!a&&u)return u(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var s=n[o]={exports:{}};t[o][0].call(s.exports,function(e){var n=t[o][1][e];return i(n||e)},s,s.exports,e,t,n,c)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<c.length;o++)i(c[o]);return i}({1:[function(e,t,n){"use strict";function c(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(t,n,c){return n&&e(t.prototype,n),c&&e(t,c),t}}(),o=e("./util.es6"),a=c(e("./controller/connect.es6")),u=c(e("./controller/disconnect.es6")),l=c(e("./controller/readValue.es6")),s=c(e("./controller/saveValue.es6")),f=c(e("./controller/notification.es6")),h=function(){function e(){i(this,e),this.connecting=!1,this.name=null,this.device=null,this.service=null,this.characteristics=null}return r(e,[{key:"connect",value:function(e,t){var n=this;return this.connecting=!1,(0,a.default)(e,t).then(function(e){n.connecting=!0,n.name=e.name,n.device=e.device,n.service=e.service,n.characteristics=e.characteristics}).catch(this.error)}},{key:"disconnect",value:function(){return(0,u.default)(this.device).catch(this.error)}},{key:"readValue",value:function(){return(0,l.default)(this.characteristics).catch(this.error)}},{key:"saveValue",value:function(e){return(0,s.default)(this.characteristics,e).catch(this.error)}},{key:"notification",value:function(){return(0,f.default)(this.characteristics).catch(this.error)}},{key:"error",value:function(e){throw(0,o.err)(e),"ERROR"}}]),e}();n.default=h},{"./controller/connect.es6":3,"./controller/disconnect.es6":4,"./controller/notification.es6":5,"./controller/readValue.es6":6,"./controller/saveValue.es6":7,"./util.es6":8}],2:[function(e,t,n){"use strict";function c(e){$(e).hide(),$(e+"_menu").show()}function i(e){$(e).show(),$(e+"_menu").hide()}var r=e("./util.es6"),o=function(e){return e&&e.__esModule?e:{default:e}}(e("./DeviceManager.es6")),a=new o.default,u=new o.default,l=new o.default;(0,r.log)("start."),$("#custom_connect").click(function(){var e=$("#input_service").val(),t=$("#input_characteristic").val();(0,r.log)("service="+e,"characteristic="+t),a.connect(e,t).then(function(){return c("#custom_connect")})}),$("#custom_disconnect").click(function(){a.disconnect().then(function(){return i("#custom_connect")})}),$("#custom_read").click(function(){a.readValue()}),$("#custom_save").click(function(){a.saveValue()}),$("#custom_notification").click(function(){a.notification()}),$("#battery_connect").click(function(){u.connect("battery_service","battery_level").then(function(){return c("#battery_connect")})}),$("#battery_disconnect").click(function(){u.disconnect().then(function(){return i("#battery_connect")})}),$("#battery_read").click(function(){u.readValue()}),$("#battery_save").click(function(){u.saveValue()}),$("#battery_notification").click(function(){u.notification()}),$("#heart_rate_connect").click(function(){l.connect("heart_rate","heart_rate_control_point").then(function(){$("#heart_rate_connect").hide(),$("#heart_rate_connect_menu").show()})}),$("#heart_rate_disconnect").click(function(){u.disconnect().then(function(){$("#heart_rate_connect").show(),$("#heart_rate_connect_menu").hide()})}),$("#heart_rate_read").click(function(){l.readValue()}),$("#heart_rate_save").click(function(){l.saveValue()}),$("#heart_rate_notification").click(function(){l.notification()});var s=new o.default,f=new o.default;$("#BLESerial_connect").click(function(){l.connect("heart_rate","heart_rate_control_point").then(function(){var e=$("#input_service").val(),t=$("#input_characteristic_notify").val(),n=$("#input_characteristic_write").val();(0,r.log)("service="+e),(0,r.log)("characteristicNotify="+t),(0,r.log)("characteristicWrite="+n),s.connect(e,t).then(function(){return f.connect(e,n)}).then(function(){return c("#BLESerial_connect")}).catch(function(){return i("#BLESerial_connect")})})}),$("#BLESerial_disconnect").click(function(){s.disconnect().then(function(){return f.disconnect()}).then(function(){return i("#BLESerial_connect")})}),$("#BLESerial_read").click(function(){s.readValue()}),$("#BLESerial_save").click(function(){s.saveValue("1")}),$("#BLESerial_notification").click(function(){s.notification()})},{"./DeviceManager.es6":1,"./util.es6":8}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r;return new Promise(function(n,i){(0,c.log)("clickFunc called.");var r=void 0,o=void 0,a=void 0,u=void 0;(0,c.log)("scanning device."),navigator.bluetooth.requestDevice({filters:[{services:[e]}]}).then(function(e){return o=e,r=e.name,(0,c.log)("start connecting device. ",JSON.stringify(e)),e.gatt.connect()}).then(function(t){return(0,c.log)("checking sevice. ",JSON.stringify(t)),t.getPrimaryService(e)}).then(function(e){return(0,c.log)("checking characteristics. ",e),u=e,e.getCharacteristic(t)}).then(function(e){(0,c.log)("discovered characteristics. ",e),a=e}).then(function(){n({name:r,device:o,service:u,characteristics:a})}).catch(function(e){i(e)})})};var c=e("../util.es6"),i="battery_service",r="battery_level"},{"../util.es6":8}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return new Promise(function(t){(0,c.log)("disconnect. "),e&&e.gatt.disconnect(),t()})};var c=e("../util.es6")},{"../util.es6":8}],5:[function(e,t,n){"use strict";function c(e){for(var t=e.target.value,n=[],c=0;c<t.byteLength;c++)n.push("0x"+("00"+t.getUint8(c).toString(16)).slice(-2));(0,i.log)("> "+n.join(" "))}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return new Promise(function(t){e.startNotifications().then(function(t){e.addEventListener("characteristicvaluechanged",c)})})};var i=e("../util.es6")},{"../util.es6":8}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return new Promise(function(t){(0,c.log)("read."),e.readValue().then(function(e){(0,c.log)("read data. ",e.getUint8(0)),t()})})};var c=e("../util.es6")},{"../util.es6":8}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[1];return new Promise(function(n){(0,c.log)("save.");var i=new Uint8Array(t);e.writeValue(i).then(function(e){(0,c.log)("save data. "),n()})})};var c=e("../util.es6")},{"../util.es6":8}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.log=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];$("#log").prepend("<span class='debug'>"+t+"</span><br />"),console.log(JSON.stringify(t))},n.err=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];$("#log").prepend("<span class='error'>"+t+"</span><br />"),console.log(JSON.stringify(t))}},{}]},{},[2]);
//# sourceMappingURL=main.js.map
