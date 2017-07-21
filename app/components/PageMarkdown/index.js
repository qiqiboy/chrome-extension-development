import React, { Component } from 'react';
import marked from 'marked';
import './style.scss';

const chrome = window.chrome;
const KEY = 'chrome-extension-development-markdown';

class Markdown extends Component {
    async componentDidMount() {
        const [Editor] = await Promise.all([
            import('codemirror'), //异步载入编辑器代码
            import('codemirror/mode/markdown/markdown'),
            import('codemirror/lib/codemirror.css'), //载入编辑器样式
            import('codemirror/theme/solarized.css') //载入编辑器主题
        ]);

        this.editor = new Editor(this.refs.editor, {
            mode: 'markdown',
            lineNumbers: true,
            theme: 'solarized',
            value: localStorage.getItem(KEY) || `Markdown编辑器
=====
直接输入内容将会在当前tab预览效果
`
        });

        this.editor.on('change', this.preview);
    }

    preview = async () => {
        const code = this.editor.getValue();
        const html = marked(code);

        chrome.runtime.sendMessage({
            action: 'markdown',
            html
        });

        localStorage.setItem(KEY, code);
    }

    render() {

        return (
            <div className="markdown">
                <div ref="editor"></div>
                <button className="btn btn-success" onClick={this.preview}>预览</button>
            </div>
        );
    }
}

export default Markdown;
