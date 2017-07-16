webpackHotUpdate(5,{

/***/ "./app/components/PageOptions/index.js":
/*!*********************************************!*\
  !*** ./app/components/PageOptions/index.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/_babel-runtime@6.23.0@babel-runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ "./node_modules/_react@15.6.1@react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OptionItem__ = __webpack_require__(/*! ../OptionItem */ "./app/components/OptionItem/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_request__ = __webpack_require__(/*! ../../utils/request */ "./app/utils/request.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_options__ = __webpack_require__(/*! ../../utils/options */ "./app/utils/options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__ = __webpack_require__(/*! ../../utils/tabUtil */ "./app/utils/tabUtil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__InfoItem__ = __webpack_require__(/*! ../InfoItem */ "./app/components/InfoItem/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_qrcode__ = __webpack_require__(/*! qrcode */ "./node_modules/_qrcode@0.8.2@qrcode/lib/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_qrcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_qrcode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__style_scss__ = __webpack_require__(/*! ./style.scss */ "./app/components/PageOptions/style.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__style_scss__);

var _jsxFileName = '/Users/qiqibopy/develop/chrome-extension-development/app/components/PageOptions/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var chrome = window.chrome;

var PageOptions = function (_Component) {
    _inherits(PageOptions, _Component);

    function PageOptions() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PageOptions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageOptions.__proto__ || Object.getPrototypeOf(PageOptions)).call.apply(_ref, [this].concat(args))), _this), _this.state = __WEBPACK_IMPORTED_MODULE_4__utils_options__["a" /* default */].getSync(), _this.tabUtil = {
            openGithubInNewTab: function openGithubInNewTab() {
                chrome.tabs.create({
                    url: 'https://github.com/qiqiboy'
                });
            },
            openGithubInCurTab: function () {
                var _ref2 = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                    var tab;
                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["c" /* getCurrent */]();

                                case 2:
                                    tab = _context.sent;

                                    chrome.tabs.update(tab.id, {
                                        url: 'https://github.com/qiqiboy'
                                    });

                                case 4:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function openGithubInCurTab() {
                    return _ref2.apply(this, arguments);
                }

                return openGithubInCurTab;
            }(),
            createBlankTab: function () {
                var _ref3 = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
                    var tab;
                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["c" /* getCurrent */]();

                                case 2:
                                    tab = _context2.sent;

                                    chrome.tabs.create({
                                        index: tab.index + 1
                                    });

                                case 4:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function createBlankTab() {
                    return _ref3.apply(this, arguments);
                }

                return createBlankTab;
            }(),
            closeCurTab: function () {
                var _ref4 = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
                    var tab;
                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.next = 2;
                                    return __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["c" /* getCurrent */]();

                                case 2:
                                    tab = _context3.sent;

                                    chrome.tabs.remove(tab.id);

                                case 4:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function closeCurTab() {
                    return _ref4.apply(this, arguments);
                }

                return closeCurTab;
            }(),
            createNewWindow: function createNewWindow() {
                chrome.windows.create();
            },
            closeCurWindow: function closeCurWindow() {
                chrome.windows.getCurrent(null, function (win) {
                    chrome.windows.remove(win.id);
                });
            },
            zoomMoveMaxCurWindow: function zoomMoveMaxCurWindow() {
                window.close(); //关闭popup窗口

                chrome.windows.getCurrent(null, function (win) {
                    //要执行的步骤更新的窗口信息
                    var steps = [{
                        state: 'minimized'
                    }, {
                        state: 'normal'
                    }, {
                        width: 500,
                        height: 500,
                        top: 0,
                        left: 0
                    }, {
                        top: window.screen.availHeight - 500,
                        left: window.screen.availWidth - 500
                    }, {
                        state: 'fullscreen'
                    }, {
                        state: 'normal'
                    }, {
                        state: 'maximized'
                    }, {
                        width: win.width,
                        height: win.height,
                        focused: true
                    }];

                    chrome.runtime.sendMessage({
                        action: 'updateWindow',
                        steps: steps
                    });
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    //同步获取设置


    _createClass(PageOptions, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.fetchOptions();
            this.getTabInfo();

            //监听窗口激活，更新设置项
            //这里是考虑到同时打开多个设置项页面，也可以保持设置同步
            chrome.runtime.onMessage.addListener(function (data) {
                if (data.action === 'active') {
                    _this2.fetchOptions();
                }
            });
        }
    }, {
        key: 'fetchOptions',
        value: function () {
            var _ref5 = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee4() {
                var options;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return __WEBPACK_IMPORTED_MODULE_4__utils_options__["a" /* default */].getAsync();

                            case 2:
                                options = _context4.sent;

                                this.setState(options);

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function fetchOptions() {
                return _ref5.apply(this, arguments);
            }

            return fetchOptions;
        }()
    }, {
        key: 'setOption',
        value: function () {
            var _ref6 = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee5(key, value) {
                var options;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return __WEBPACK_IMPORTED_MODULE_4__utils_options__["a" /* default */].setAsync(key, value);

                            case 2:
                                options = _context5.sent;


                                //设置完成后向当前页面广播设置更新消息
                                //页面的content scripts中也添加了监听器，当捕获到该条广播时，会根据相关设置调整页面显示
                                __WEBPACK_IMPORTED_MODULE_3__utils_request__["c" /* sendActiveTabRequest */]({
                                    action: 'updateOption',
                                    options: options
                                });

                                __WEBPACK_IMPORTED_MODULE_3__utils_request__["d" /* sendRuntimeMessage */]({
                                    action: 'updateOption'
                                });

                                //同步组件状态中的设置项，以触发组件展示更新
                                this.setState(_defineProperty({}, key, value));

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function setOption(_x, _x2) {
                return _ref6.apply(this, arguments);
            }

            return setOption;
        }()
    }, {
        key: 'getTabInfo',
        value: function () {
            var _ref7 = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee6() {
                var allTabs, curTab;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["b" /* getAll */]();

                            case 2:
                                allTabs = _context6.sent;
                                _context6.next = 5;
                                return __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["c" /* getCurrent */]();

                            case 5:
                                curTab = _context6.sent;

                                this.setState({
                                    curTab: {
                                        index: curTab.index + 1,
                                        url: curTab.url,
                                        title: curTab.title
                                    }
                                });

                                this.createQrcode(curTab.url);

                                this.setState({
                                    allTabs: allTabs.length
                                });

                            case 9:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getTabInfo() {
                return _ref7.apply(this, arguments);
            }

            return getTabInfo;
        }()
    }, {
        key: 'createQrcode',
        value: function createQrcode(text) {
            var _this3 = this;

            __WEBPACK_IMPORTED_MODULE_7_qrcode___default.a.toDataURL(text, {
                color: {
                    dark: '#a94442', // Blue dots
                    light: '#fff' // Transparent background
                }
            }, function (err, qrcode) {
                _this3.setState({
                    qrcode: qrcode
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                curTab = _state.curTab,
                allTabs = _state.allTabs,
                qrcode = _state.qrcode,
                options = _objectWithoutProperties(_state, ['curTab', 'allTabs', 'qrcode']);

            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'div',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 158
                    },
                    __self: this
                },
                curTab && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'div',
                    { className: 'cur-tab-info', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 159
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__InfoItem__["a" /* default */], { label: '\u6807\u9898', content: curTab.title, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 160
                        },
                        __self: this
                    }),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__InfoItem__["a" /* default */], { label: '\u5730\u5740', content: curTab.url, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 161
                        },
                        __self: this
                    }),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__InfoItem__["a" /* default */], { label: '\u6B21\u5E8F', content: '\u603Btab\u6570\uFF1A' + allTabs + '\uFF0C\u5F53\u524D\uFF1A' + curTab.index, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 162
                        },
                        __self: this
                    }),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', { src: qrcode, width: '100', className: 'qrcode', alt: 'qrcode', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 163
                        },
                        __self: this
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2__OptionItem__["a" /* default */],
                    { active: options.enableSkin, onChange: this.setOption.bind(this, 'enableSkin'), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 165
                        },
                        __self: this
                    },
                    options.enableSkin ? '黑色皮肤已启用' : '未启用黑色皮肤'
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2__OptionItem__["a" /* default */],
                    { active: options.clearMode, onChange: this.setOption.bind(this, 'clearMode'), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 169
                        },
                        __self: this
                    },
                    options.clearMode ? '清爽模式' : '正常模式'
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2__OptionItem__["a" /* default */],
                    { active: options.fullscreen, onChange: this.setOption.bind(this, 'fullscreen'), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 173
                        },
                        __self: this
                    },
                    options.fullscreen ? '全屏模式' : '非全屏模式'
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'div',
                    { className: 'btn-group', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 177
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: this.tabUtil.openGithubInNewTab, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 178
                            },
                            __self: this
                        },
                        '\u65B0\u6807\u7B7E\u9875\u4E2D\u8BBF\u95EEGithub'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: this.tabUtil.openGithubInCurTab, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 179
                            },
                            __self: this
                        },
                        '\u5F53\u524D\u6807\u7B7E\u9875\u4E2D\u8BBF\u95EEGithub'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: this.tabUtil.createBlankTab, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 180
                            },
                            __self: this
                        },
                        '\u521B\u5EFA\u65B0\u6807\u7B7E\u9875'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: this.tabUtil.closeCurWindow, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 181
                            },
                            __self: this
                        },
                        '\u5173\u95ED\u5F53\u524D\u7A97\u53E3'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: this.tabUtil.createNewWindow, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 182
                            },
                            __self: this
                        },
                        '\u521B\u5EFA\u65B0\u7A97\u53E3'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: this.tabUtil.zoomMoveMaxCurWindow, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 183
                            },
                            __self: this
                        },
                        '\u7F29\u5C0F\u79FB\u52A8\u6700\u5927\u5316\u5F53\u524D\u7A97\u53E3'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: this.tabUtil.closeCurTab, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 184
                            },
                            __self: this
                        },
                        '\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["e" /* moveCurTabLast */], __source: {
                                fileName: _jsxFileName,
                                lineNumber: 185
                            },
                            __self: this
                        },
                        '\u5C06\u5F53\u524D\u6807\u7B7E\u9875\u79FB\u52A8\u5230\u6700\u540E\u9762'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["d" /* moveCurTabFirst */], __source: {
                                fileName: _jsxFileName,
                                lineNumber: 186
                            },
                            __self: this
                        },
                        '\u5C06\u5F53\u524D\u6807\u7B7E\u9875\u79FB\u52A8\u5230\u6700\u524D\u9762'
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                        'button',
                        { className: 'btn-option-item btn btn-success', onClick: __WEBPACK_IMPORTED_MODULE_5__utils_tabUtil__["a" /* copyCurWindow */], __source: {
                                fileName: _jsxFileName,
                                lineNumber: 187
                            },
                            __self: this
                        },
                        '\u590D\u5236\u5F53\u524D\u7A97\u53E3'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2__OptionItem__["a" /* default */],
                    { active: options.animateIcon, onChange: this.setOption.bind(this, 'animateIcon'), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 190
                        },
                        __self: this
                    },
                    options.animateIcon ? '动态icon' : '静态icon'
                )
            );
        }
    }]);

    return PageOptions;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (PageOptions);

/***/ })

})
//# sourceMappingURL=5.f9f37f79c9b99061f9d3.hot-update.js.map