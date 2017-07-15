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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "../dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/background.js":
/*!***************************!*\
  !*** ./app/background.js ***!
  \***************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_options__ = __webpack_require__(/*! ./utils/options */ "./app/utils/options.js");


var chrome = window.chrome;

//将Options操作对象添加到window域下，以供扩展其它部分访问
window.extensionOptions = __WEBPACK_IMPORTED_MODULE_0__utils_options__["a" /* default */];

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
    switch (data.action) {
        case 'executeScript':
            chrome.tabs.executeScript(null, { code: data.code });
            break;
        case 'insertCSS':
            chrome.tabs.insertCSS(null, { code: data.code });
            break;

        case 'getOption':
            sendResponse(__WEBPACK_IMPORTED_MODULE_0__utils_options__["a" /* default */].get(data.key));
            break;

        case 'setOption':
            sendResponse(__WEBPACK_IMPORTED_MODULE_0__utils_options__["a" /* default */].set(data.key, data.value));
            break;

        default:
            //nothing todo
            break;
    }
});

chrome.tabs.onActivated.addListener(function (_ref) {
    var tabId = _ref.tabId;

    chrome.tabs.sendMessage(tabId, {
        action: 'active'
    });
});

/***/ }),

/***/ "./app/utils/options.js":
/*!******************************!*\
  !*** ./app/utils/options.js ***!
  \******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var chrome = window.chrome;
var KEY = 'chrome-extension-options';
var options = void 0;

//从localstorage中取得设置数据
try {
    options = JSON.parse(localStorage.getItem(KEY)) || {};
} catch (e) {
    options = {};
}

//获取对background运行的页面window对象引用
var backgroundWindow = void 0;

//放到try catch代码块中是因为getBackgroundPage方法在content scripts中是访问不了的
try {
    backgroundWindow = chrome.extension.getBackgroundPage();
} catch (e) {}

/* harmony default export */ __webpack_exports__["a"] = (Object.assign({
    options: options,

    /*!
     * @desc get与set供background中直接调用
     *      不要在browser action或者content scirpts中直接调用该方法
     *      前者可能导致状态不一致，或者会设置失败（content scripts是共享所在页面的bom dom）
     */
    get: function get(key) {
        return key === undefined ? options : options[key];
    },
    set: function set(key, value) {
        options[key] = value;

        localStorage.setItem(KEY, JSON.stringify(options));

        return options;
    }
}, backgroundWindow === window ? null : {
    /*!
     * @desc 在content scripts或者browser action等环境中需要使用该方法
     *      getAsync、setAsync是通过扩展通信接口实现的异步方法, @return 返回 Promise 对象
     *      getSync、setSync是通过调用扩展运行页面window对象实现的同步方法
     */
    getAsync: function getAsync(key) {
        return new Promise(function (resolve) {
            chrome.runtime.sendMessage({
                action: 'getOption',
                key: key
            }, resolve);
        });
    },
    setAsync: function setAsync(key, value) {
        return new Promise(function (resolve) {
            chrome.runtime.sendMessage({
                action: 'setOption',
                key: key,
                value: value
            }, resolve);
        });
    },
    getSync: function getSync(key) {
        return backgroundWindow.extensionOptions.get(key);
    },
    setSync: function setSync() {
        var _backgroundWindow$ext;

        return (_backgroundWindow$ext = backgroundWindow.extensionOptions).set.apply(_backgroundWindow$ext, arguments);
    }
}));

/***/ })

/******/ });
//# sourceMappingURL=background.js.map