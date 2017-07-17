let lastPosition;
let iconNode;

/*
 *const iconUrl = window.chrome.runtime.getURL('icons/icon_48.png');
 */

document.addEventListener('mousedown', ev => {
    if (!isIconNode(ev.target)) {
        hideIcon();
    }
}, false);

document.addEventListener('mouseup', ev => {
    lastPosition = {
        x: ev.pageX,
        y: ev.pageY
    }

    const selectionText = getText();

    if (selectionText) {
        showIcon(selectionText);
    }
}, false);

function getText() {
    return window.getSelection().toString().trim();
}

function isIconNode(target) {
    return iconNode && (target === iconNode || iconNode.contains(target));
}

function showIcon(selectionText) {
    if (!iconNode) {
        iconNode = document.createElement('div');
        iconNode.className = 'chrome-extension-github-search-icon';
        iconNode.innerHTML = document.querySelector('.octicon-mark-github').outerHTML.replace(/class="[^"]+"/, 'class="github-icon"');

        iconNode.addEventListener('click', () => {
            window.location.href = 'https://github.com/search?q=' + iconNode.searchText;
        }, false);

        document.body.appendChild(iconNode);
    }

    iconNode.style.cssText = `display:block;
        position:absolute;
        top:${lastPosition.y + 10}px;
        left:${lastPosition.x}px;
        z-index:99999;`;
    iconNode.searchText = selectionText;
}

function hideIcon() {
    if (iconNode) {
        iconNode.style.display = 'none';
    }
}
