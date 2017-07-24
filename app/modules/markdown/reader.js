import URL from 'url';

const chrome = window.chrome;

chrome.tabs.onUpdated.addListener(async (tabId, { status }, tab) => {
    if(status === 'loading' && URL.parse(tab.url).protocol.substring(0, 6) !== 'chrome') {
        const mime = await getMIME(tabId);
        const isMdUrl = checkMd(tab.url);

        //如果是md文档地址，而且页面的contentType是普通文本
        //或者页面的contentType是markdown文档
        //则向当前页面注入js
        if ((isMdUrl && mime === 'text/plain') || /markdown/i.test(mime)) {
            chrome.tabs.executeScript(tabId, {
                file: 'dist/js/md-file-render.js'
            });
        }
    }
});


function getMIME(tabId) {
    return new Promise(resolve => {
        chrome.tabs.executeScript(tabId, {
            code: `document.contentType`
        }, ([result]) => {
            resolve(result);
        });
    });
}


function checkMd(url) {
    return /md|markdown|mkd/i.test(URL.parse(url).pathname);
}
