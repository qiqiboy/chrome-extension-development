//运行在background环境中，在当前tab中渲染出效果
//
import URL from 'url';
import { getCurrent } from '../../utils/tabUtil';
import * as mdUtil from '../../utils/mdUtil';
import './reader.js';

const chrome = window.chrome;
const skinUrl = chrome.runtime.getURL('md.skin.github.css');
const previewPage = chrome.runtime.getURL('markdown.html');
const editPage = chrome.runtime.getURL('popup.html');
//不能用background中的screen，因为这个页面不可见，所以默认是主屏幕的信息
//并不是实际中浏览器所在屏幕的信息
// const screen = window.screen;

chrome.runtime.onMessage.addListener(async ({ action, html, code, screen }) => {
    if (action === 'markdown') {
        const curTab = await getCurrent();
        const host = URL.parse(curTab.url).host;

        if (host === 'github.com') {
            chrome.tabs.executeScript(curTab.id, {
                code: createPageCode(html)
            });
        } else {
            const tab = await findTheTab(previewPage, host === chrome.runtime.id);
            chrome.tabs.sendMessage(tab.id, {
                action,
                html
            });
        }
    }

    if(action === 'markdown-edit') {
        mdUtil.set(code);
        //切换到md编辑tab
        localStorage.setItem('chrome-extension-popup-tab-id', 'markdown');

        const tab = await findTheTab(editPage);
        chrome.tabs.reload(tab.id);
    }

    if (action === 'markdown-edit-mode') {
        const previewTab = await findTheTab(previewPage);
        const editTab = await findTheTab(editPage);
        const halfWidth = screen.availWidth / 2;
        const previewRect = {
            top: screen.availTop,
            left: screen.availLeft,
            width: halfWidth,
            height: screen.availHeight,
            state: 'normal',
            focused: true
        }

        //如果预览与编辑页面是同一个窗口，则要将它们分开到不同的窗口
        //我们选择将预览窗口独立出来
        if (previewTab.windowId === editTab.windowId) {
            await new Promise(resolve => chrome.windows.create({
                tabId: previewTab.id,
                ...previewRect
            }, resolve));
        } else {
            //将预览窗口移动到左边
            chrome.windows.update(previewTab.windowId, previewRect);
        }

        //将编辑窗口移动到右边
        chrome.windows.update(editTab.windowId, {
            state: 'normal',
            top: screen.availTop,
            left: screen.availLeft + halfWidth,
            width: halfWidth,
            height: screen.availHeight
        });
    }
});

function createPageCode(html) {
    const codes = [];
    codes.push(`document.open();`);
    codes.push(`document.write(\`<html>
        <head>
            <title>Markdown预览 - chrome extension development</title>
            <link rel="stylesheet" href="${skinUrl}" type="text/css" media="all" />
        </head>
        <body class="markdown-body">
            ${html}
        </body>
</html>
\`);`);
    codes.push(`document.close();`);

    return codes.join('\n');
}

function findTheTab(url, quiet) {
    return new Promise(resolve =>
        chrome.tabs.query({
            url
        }, function([tab]) {
            if (tab) {
                resolve(tab);

                if (!tab.active && !quiet) {
                    chrome.tabs.update(tab.id, {
                        active: true
                    });
                }
            } else {
                chrome.tabs.create({
                    url,
                    active: !quiet
                }, tab => {
                    setTimeout(() => resolve(tab), 500);
                });
            }
        }));
}
