import http from 'axios';

const chrome = window.chrome;

//这里可以根据环境配置请求线上还是线下api
//这里是拿github做示例，所以都是一个地址
const HOST = process.env.NODE_ENV === 'development' ? 'https://api.github.com' : 'https://api.github.com'

//获取指定用户的信息
export const getUser = user => http.get(HOST + `/users/${user}`);

//获取指定用户的仓库列表
export const getRepos = user => http.get(HOST + `/users/${user}/repos`);

export const executeScript = code => {
    return new Promise((resolve, reject) => chrome.runtime.sendMessage({
        action: 'executeScript',
        data: code
    }, resolve));
}

/*！
 * @desc 向当前tab发送消息
 *      我们的操作都是在github站点上，所以作下判断，如果当前tab不是github就不发消息了
 *
 *      注意：这里是判断当前激活的tab是不是我们需要的站点，然后再发送相关消息。也可以获取所有的tab，向符合的tab发送消息。
 *      后者适用于简单的操作，如果页面需要大量的计算、dom操作等，不要这么做，会有性能、页面休眠等负面影响
 */
export const sendActiveTabRequest = (...args) => {
    chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }, ([tab]) => {
        chrome.tabs.sendMessage(tab.id, ...args);
    });
}

/*！
 * @desc 向所有tab发送消息
 */
export const sendAllTabsRequest = (...args) => {
    chrome.tabs.query({
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }, tabs => tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, ...args);
    }));
}

/*！
 * @desc 向扩展发送消息
 */
export const sendRuntimeMessage = (...args) => {
    chrome.runtime.sendMessage(...args);
}
