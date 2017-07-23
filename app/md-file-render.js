import React from 'react';
import { render } from 'react-dom';
import marked from 'marked';
import Markdown from './modules/markdown';
import '../extension/md.skin.github.css';

const source = document.querySelector('pre').textContent;

try {
    const html = marked(source);
    const container = document.createElement('div');
    document.body.insertAdjacentElement('afterBegin', container);

    render(<Markdown html={html} code={source}/>, container);
} catch (e) {console.error(e)};
