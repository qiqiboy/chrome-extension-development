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
        this.editor.on('cursorActivity', this.preview)
    }

    preview = (() => {
        let lastLine = 0,
            lastTime = 0,
            timer;

        return () => {
            const now = Date.now();

            clearTimeout(timer);
            if (now - lastTime < 500) {
                timer = setTimeout(this.preview, 500 - now + lastTime);
            } else {
                let code = this.editor.getValue(),
                    curLine;

                localStorage.setItem(KEY, code);
                try {
                    curLine = this.editor.curOp.scrollToPos.to.line;

                    const allLines = code.split('\n');
                    allLines.splice(curLine, 1, allLines[curLine] + '<div id="currrent-position"></div>');
                    code = allLines.join('\n');
                } catch (e) {}

                const html = marked(code);

                chrome.runtime.sendMessage({
                    action: 'markdown',
                    html
                });

                lastTime = now;
            }
        }
    })();

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
