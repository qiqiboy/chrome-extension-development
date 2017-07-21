window.chrome.runtime.onMessage.addListener(({ action, html }) => {
    if (action === 'markdown') {
        document.body.innerHTML = html;
    }
});
