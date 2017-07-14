import React from 'react';

function Link(props) {
    return <a {...props} onClick={openUrl.bind(null, props.href)}>{props.children}</a>;
}

function openUrl(url, ev) {
    window.chrome.tabs.create({
        url
    });

    ev.preventDefault();
}

export default Link;
