/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// import './backgrounds'
var is_Running_Content = false;
var is_Running_Backend = false;
var Remaining_Time = 0;
var Stopped_Time = 0;
var Kill_Signal = false;
// from content
chrome.runtime.onMessage.addListener(function (getData, sender, sendResponse) {
    console.log(getData);
    switch (getData.messageType) {
        case "checkTimerStatus":
            console.log("checkTimerStatus\u306B\u3066" + is_Running_Backend);
            sendResponse({
                TimerStatus: is_Running_Backend,
                NowTime: Remaining_Time,
                ContentRunning: is_Running_Content,
                Stopped_Time: Stopped_Time,
            });
            //  ここに現在の時間のレスポンスを加える
            break;
        case "chengeTimerStatus":
            if (getData.onTimer) {
                is_Running_Backend = true;
                is_Running_Content = true;
                Kill_Signal = false;
                console.log("chengeTimerStatus\u306B\u3066" + is_Running_Backend);
                setBackgroundTimer(getData.time);
                sendResponse({ response: "NOW TIMER ON" });
            }
            else {
                is_Running_Backend = false;
                sendResponse({ response: "NOW TIMER OFF" });
            }
            break;
        case "stopTimer":
            is_Running_Content = false;
            Stopped_Time = getData.Stopped_Time;
            console.log(Stopped_Time);
            Kill_Signal = true;
            sendResponse({ Stopped_Time: Stopped_Time });
            break;
        case "deleteTimer":
            is_Running_Backend = false;
            is_Running_Content = false;
            Kill_Signal = true;
            sendResponse({ delete_message: "delete success" });
            break;
    }
});
// in => time(mm sec) , out => change remainTime
function setBackgroundTimer(time) {
    function showtime() {
        var timeoutId = setTimeout(showtime, 1000);
        time = time - 1000;
        console.log(time);
        Remaining_Time = time;
        if (time == -1000 || Kill_Signal == true) {
            clearTimeout(timeoutId);
            is_Running_Backend = false;
        }
    }
    showtime();
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.background.js.map