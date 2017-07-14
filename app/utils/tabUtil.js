const chrome = window.chrome;

export const getCurrent = function() {
    return new Promise(resolve => chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }, ([tab]) => resolve(tab)));
}

export const closeCurTab = async function() {
    const current = await getCurrent();
    chrome.tabs.remove(current.id);
}

export const moveCurTabLast = async function() {
    const current = await getCurrent();
    chrome.tabs.move(current.id, {
        index: -1
    });
}

export const moveCurTabFirst = async function() {
    const current = await getCurrent();
    chrome.tabs.move(current.id, {
        index: 0
    });
}

export const copyCurWindow = function() {
    chrome.windows.getCurrent({
        populate: true
    }, win => {
        chrome.windows.create({
            url: win.tabs.map(tab => tab.url)
        });
    });
}
