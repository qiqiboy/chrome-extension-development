const chrome = window.chrome;
const KEY = 'chrome-extension-options';
let options;

//从localstorage中取得设置数据
try {
    options = JSON.parse(localStorage.getItem(KEY)) || {};
} catch (e) {
    options = {};
}

//获取对background运行的页面window对象引用
let backgroundWindow;

//放到try catch代码块中是因为getBackgroundPage方法在content scripts中是访问不了的
try {
    backgroundWindow = chrome.extension.getBackgroundPage();
} catch(e) {}

export default Object.assign({
    options,

    /*!
     * @desc get与set供background中直接调用
     *      不要在browser action或者content scirpts中直接调用该方法
     *      前者可能导致状态不一致，或者会设置失败（content scripts是共享所在页面的bom dom）
     */
    get(key) {
        return key === undefined ? options : options[key];
    },

    set(key, value) {
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
    getAsync(key) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({
                action: 'getOption',
                key
            }, resolve);
        });
    },
    setAsync(key, value) {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({
                action: 'setOption',
                key,
                value
            }, resolve);
        });
    },

    getSync(key) {
        return backgroundWindow.extensionOptions.get(key);
    },
    setSync(...args) {
        return backgroundWindow.extensionOptions.set(...args);
    }
});
