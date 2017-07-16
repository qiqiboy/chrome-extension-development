webpackHotUpdate(7,{

/***/ "./app/background.js":
/*!***************************!*\
  !*** ./app/background.js ***!
  \***************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/_babel-runtime@6.23.0@babel-runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_options__ = __webpack_require__(/*! ./utils/options */ "./app/utils/options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_animateIcon__ = __webpack_require__(/*! ./utils/animateIcon */ "./app/utils/animateIcon/index.js");


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




var chrome = window.chrome;

//将Options操作对象添加到window域下，以供扩展其它部分访问
window.extensionOptions = __WEBPACK_IMPORTED_MODULE_1__utils_options__["a" /* default */];

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
    switch (data.action) {
        case 'executeScript':
            chrome.tabs.executeScript(null, { code: data.code });
            break;
        case 'insertCSS':
            chrome.tabs.insertCSS(null, { code: data.code });
            break;

        case 'getOption':
            sendResponse(__WEBPACK_IMPORTED_MODULE_1__utils_options__["a" /* default */].get(data.key));
            break;

        case 'setOption':
            sendResponse(__WEBPACK_IMPORTED_MODULE_1__utils_options__["a" /* default */].set(data.key, data.value));
            break;

        case 'optionUpdated':
            if (__WEBPACK_IMPORTED_MODULE_2__utils_animateIcon__["a" /* default */].running !== __WEBPACK_IMPORTED_MODULE_1__utils_options__["a" /* default */].get('animateIcon')) {
                __WEBPACK_IMPORTED_MODULE_1__utils_options__["a" /* default */].get('animateIcon') ? __WEBPACK_IMPORTED_MODULE_2__utils_animateIcon__["a" /* default */].start() : __WEBPACK_IMPORTED_MODULE_2__utils_animateIcon__["a" /* default */].stop();
            }
            break;

        case 'updateWindow':
            chrome.windows.getCurrent(null, function () {
                var _ref = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(win) {
                    var updateWindow, delay, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, info;

                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    updateWindow = function updateWindow(updateInfo) {
                                        return new Promise(function (resolve) {
                                            return chrome.windows.update(win.id, updateInfo, resolve);
                                        });
                                    };
                                    //定义一个延迟执行器


                                    delay = function delay(ms) {
                                        return new Promise(function (resolve) {
                                            return setTimeout(resolve, ms);
                                        });
                                    };

                                    //要执行的步骤更新的窗口信息


                                    _iteratorNormalCompletion = true;
                                    _didIteratorError = false;
                                    _iteratorError = undefined;
                                    _context.prev = 5;
                                    _iterator = data.steps[Symbol.iterator]();

                                case 7:
                                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                        _context.next = 16;
                                        break;
                                    }

                                    info = _step.value;
                                    _context.next = 11;
                                    return updateWindow(info);

                                case 11:
                                    _context.next = 13;
                                    return delay(1000);

                                case 13:
                                    _iteratorNormalCompletion = true;
                                    _context.next = 7;
                                    break;

                                case 16:
                                    _context.next = 22;
                                    break;

                                case 18:
                                    _context.prev = 18;
                                    _context.t0 = _context['catch'](5);
                                    _didIteratorError = true;
                                    _iteratorError = _context.t0;

                                case 22:
                                    _context.prev = 22;
                                    _context.prev = 23;

                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }

                                case 25:
                                    _context.prev = 25;

                                    if (!_didIteratorError) {
                                        _context.next = 28;
                                        break;
                                    }

                                    throw _iteratorError;

                                case 28:
                                    return _context.finish(25);

                                case 29:
                                    return _context.finish(22);

                                case 30:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[5, 18, 22, 30], [23,, 25, 29]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }());
            break;

        default:
            //nothing todo
            break;
    }
});

chrome.tabs.onActivated.addListener(function (_ref2) {
    var tabId = _ref2.tabId;

    chrome.tabs.sendMessage(tabId, {
        action: 'active'
    });
});

if (__WEBPACK_IMPORTED_MODULE_1__utils_options__["a" /* default */].get('animateIcon')) {
    __WEBPACK_IMPORTED_MODULE_2__utils_animateIcon__["a" /* default */].start();
}

/***/ })

})
//# sourceMappingURL=7.41724e9966ae2a6b521f.hot-update.js.map