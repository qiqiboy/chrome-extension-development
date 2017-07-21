//运行在background环境中，在当前tab中渲染出效果
//
import URL from 'url';
import {getCurrent} from '../../utils/tabUtil';

const chrome = window.chrome;
const skinUrl = chrome.runtime.getURL('md.skin.github.css');
const previewPage = chrome.runtime.getURL('markdown.html');

chrome.runtime.onMessage.addListener(async({ action, html }) => {
    if (action === 'markdown') {
        const curTab = await getCurrent();
        const host = URL.parse(curTab.url).host;

        if (host === 'github.com') {
            chrome.tabs.executeScript(curTab.id, {
                code: createPageCode(html)
            });
        } else {
            const tab = await findMyTab(host === chrome.runtime.id);
            chrome.tabs.sendMessage(tab.id, {
                action,
                html
            });
        }
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
        <body>
            ${html}
        </body>
</html>
\`);`);
    codes.push(`document.close();`);

    return codes.join('\n');
}

function findMyTab(quiet) {
    return new Promise(resolve =>
        chrome.tabs.query({
            url: previewPage
        }, function([tab]) {
            if (tab) {
                resolve(tab);

                if (!tab.active && !quiet) {
                    chrome.tabs.update(tab.id, {
                        active: true
                    });
                }
            } else {
                chrome.tabs[quiet ? 'create' : 'update']({
                    url: previewPage,
                    active: !quiet
                }, tab => {
                    setTimeout(() => resolve(tab), 500);
                });
            }
        }));
}
