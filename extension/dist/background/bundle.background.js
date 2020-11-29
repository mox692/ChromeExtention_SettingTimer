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
eval("\n// import './backgrounds'\nvar is_Running_Content = false;\nvar is_Running_Backend = false;\nvar Remaining_Time = 0;\nvar Stopped_Time = 0;\nvar Kill_Signal = false;\n// from content\nchrome.runtime.onMessage.addListener(function (getData, sender, sendResponse) {\n    console.log(getData);\n    switch (getData.messageType) {\n        case \"checkTimerStatus\":\n            console.log(\"checkTimerStatus\\u306B\\u3066\" + is_Running_Backend);\n            sendResponse({\n                TimerStatus: is_Running_Backend,\n                NowTime: Remaining_Time,\n                ContentRunning: is_Running_Content,\n                Stopped_Time: Stopped_Time,\n            });\n            //  ここに現在の時間のレスポンスを加える\n            break;\n        case \"chengeTimerStatus\":\n            if (getData.onTimer) {\n                is_Running_Backend = true;\n                is_Running_Content = true;\n                Kill_Signal = false;\n                console.log(\"chengeTimerStatus\\u306B\\u3066\" + is_Running_Backend);\n                setBackgroundTimer(getData.time);\n                sendResponse({ response: \"NOW TIMER ON\" });\n            }\n            else {\n                is_Running_Backend = false;\n                sendResponse({ response: \"NOW TIMER OFF\" });\n            }\n            break;\n        case \"stopTimer\":\n            is_Running_Content = false;\n            Stopped_Time = getData.Stopped_Time;\n            console.log(Stopped_Time);\n            Kill_Signal = true;\n            sendResponse({ Stopped_Time: Stopped_Time });\n            break;\n        case \"deleteTimer\":\n            is_Running_Backend = false;\n            is_Running_Content = false;\n            Kill_Signal = true;\n            sendResponse({ delete_message: \"delete success\" });\n            break;\n    }\n});\n// in => time(mm sec) , out => change remainTime\nfunction setBackgroundTimer(time) {\n    function showtime(time) {\n        var timeoutId = setTimeout(showtime, 1000);\n        time = time - 1000;\n        console.log(time);\n        Remaining_Time = time;\n        if (time == -1000 || Kill_Signal == true) {\n            clearTimeout(timeoutId);\n            is_Running_Backend = false;\n        }\n    }\n    showtime(time);\n}\n\n\n//# sourceURL=webpack:///./src/background/background.ts?");

/***/ })

/******/ });