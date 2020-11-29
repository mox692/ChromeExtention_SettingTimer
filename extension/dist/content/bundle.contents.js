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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content/contents.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content/contents.ts":
/*!*********************************!*\
  !*** ./src/content/contents.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Contents;
(function (Contents) {
    var is_Runnnig = false;
    var Remaining_Time = 0;
    window.onload = function () {
        var sendData = {
            messageType: "checkTimerStatus",
        };
        chrome.runtime.sendMessage(sendData, function (response) {
            if (response) {
                is_Runnnig = response.ContentRunning;
                if (is_Runnnig)
                    Remaining_Time = response.NowTime;
                else
                    Remaining_Time = response.Stopped_Time;
                if (response.TimerStatus) {
                    createElement();
                    getBackgroundTimeEverySeconds();
                }
            }
            else {
                alert("now, you can not use timer.");
            }
        });
    };
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.onTimer == true) {
            createElement();
            changeTimerStatus(true, Number(request.settingTime) * 60000);
            getBackgroundTimeEverySeconds();
            var selection = void 0;
            if (window.getSelection) {
                // ************ todo: null check to `window.getSelection()` ****************
                selection = window.getSelection();
                if (selection === null) {
                    return;
                }
                selection = selection.toString();
            }
            else {
                selection = "";
            }
            sendResponse(selection);
        }
        else if (request.onTimer == false) {
        }
    });
    function createElement() {
        var target = document.querySelector("body");
        // ************ todo: null check to `target` **************** 
        if (target === null) {
            target = document.createElement("body");
        }
        var element = document.createElement("div");
        element.id = "hidden_id";
        element.className = "displayFix";
        target.appendChild(element);
        // create stop button
        var stopButton = document.createElement("button");
        stopButton.type = "button";
        stopButton.disabled = false;
        stopButton.className = "displayFix stop-button fnjdsanfsksadf";
        stopButton.textContent = "Stop";
        stopButton.onclick = function () {
            restartButton.disabled = false;
            stopTimer();
        };
        stopButton.id = "stop_button_id";
        target.appendChild(stopButton);
        // create restart button
        var restartButton = document.createElement("button");
        restartButton.type = "button";
        restartButton.disabled = true;
        restartButton.className = "displayFix restart-button fnjdsanfsksadf";
        restartButton.textContent = "Restart";
        restartButton.id = "restart_button_id";
        restartButton.onclick = function () {
            restartButton.disabled = true;
            restartTimer();
        };
        target.appendChild(restartButton);
        // create delete button
        var deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "displayFix delete-button fnjdsanfsksadf";
        deleteButton.textContent = "Delete";
        deleteButton.id = "delete_button_id";
        deleteButton.onclick = function () {
            deleteTimer();
        };
        target.appendChild(deleteButton);
    }
    function getBackgroundTimeEverySeconds() {
        var _a;
        var target = (_a = document.getElementById("hidden_id")) !== null && _a !== void 0 ? _a : document.createElement("body");
        var sendData = {
            messageType: "checkTimerStatus",
        };
        chrome.runtime.sendMessage(sendData, function (response) {
            if (response) {
                if (response.TimerStatus) {
                    // DISPLAY TIMER...
                    is_Runnnig = response.ContentRunning;
                    target.textContent = "" + response.NowTime;
                    Remaining_Time = response.NowTime;
                    if (is_Runnnig) {
                        if (Remaining_Time == 0) {
                            target.textContent = "Time Over!!!";
                        }
                        else {
                            target.textContent = mmTime_To_Second(response.NowTime);
                            setTimeout(getBackgroundTimeEverySeconds, 1000);
                        }
                    }
                    else {
                        target.textContent = mmTime_To_Second(response.Stopped_Time);
                    }
                }
            }
            else {
                console.log("onTimerFlag => err...");
            }
        });
    }
    function changeTimerStatus(flag, time) {
        if (flag === void 0) { flag = false; }
        var sendData = {
            messageType: "chengeTimerStatus",
            onTimer: flag,
            time: time,
        };
        chrome.runtime.sendMessage(sendData, function (response) {
            if (response) {
                console.log(response);
            }
            else {
                console.log("onTimerFlag => err...");
            }
        });
    }
    function stopTimer() {
        is_Runnnig = false;
        var sendData = {
            messageType: "stopTimer",
            Stopped_Time: Remaining_Time,
        };
        chrome.runtime.sendMessage(sendData, function (response) {
            if (response) {
                console.log(response);
            }
            else {
                console.log("onTimerFlag => err...");
            }
        });
    }
    function restartTimer() {
        is_Runnnig = true;
        changeTimerStatus(true, Remaining_Time);
        getBackgroundTimeEverySeconds();
    }
    function deleteTimer() {
        //backへの通信→それが成功したら、windowの削除
        var sendData = {
            messageType: "deleteTimer",
        };
        chrome.runtime.sendMessage(sendData, function (response) {
            if (response) {
                is_Runnnig = false;
                Remaining_Time = 0;
                deleteElement();
            }
            else {
                alert("Can Not stop timer");
            }
        });
    }
    function deleteElement() {
        $("#hidden_id").remove();
        $("#delete_button_id").remove();
        $("#stop_button_id").remove();
        $("#restart_button_id").remove();
    }
    function mmTime_To_Second(mmTime) {
        var second = mmTime / 1000;
        var disp_min;
        var disp_sec;
        if (60 <= second) {
            disp_min = Math.floor(second / 60);
            disp_sec = second % 60;
        }
        else {
            disp_min = 0;
            disp_sec = second;
        }
        return disp_min + "min " + disp_sec + "sec";
    }
})(Contents || (Contents = {}));


/***/ })

/******/ });
//# sourceMappingURL=bundle.contents.js.map