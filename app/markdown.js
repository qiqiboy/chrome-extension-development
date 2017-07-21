window.chrome.runtime.onMessage.addListener(({ action, html }) => {
    if (action === 'markdown') {
        document.body.innerHTML = html;

        const positionNode = document.querySelector('#currrent-position');

        if (positionNode) {
            setTimeout(() => window.scrollTo(0, positionNode.getBoundingClientRect().top - 100), 50);
        }
    }
});
