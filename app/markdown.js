import marked from 'marked';
import {get} from './utils/mdUtil';

window.chrome.runtime.onMessage.addListener(({ action, html }) => {
    if (action === 'markdown') {
        document.body.innerHTML = html;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const html = marked(get());

    document.body.innerHTML = html;
}, false);
