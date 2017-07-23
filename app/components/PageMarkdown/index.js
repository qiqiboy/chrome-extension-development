import React, { Component } from 'react';
import marked from 'marked';
import * as mdUtil from '../../utils/mdUtil';
import './style.scss';

const chrome = window.chrome;

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
            value: mdUtil.get()
        });

        this.editor.on('change', this.preview);

        this.preview();
    }

    preview = () => {
        const code = this.editor.getValue();
        const html = marked(code);

        chrome.runtime.sendMessage({
            action: 'markdown',
            html
        });

        mdUtil.set(code);
    }

    splitScreen = () => {
        const code = this.editor.getValue();
        const html = marked(code);

        chrome.runtime.sendMessage({
            action: 'markdown-edit-mode',
            html
        });
    }

    render() {

        return (
            <div className="markdown">
                <div className="md-editor" ref="editor"></div>
                <button className="btn btn-success" onClick={this.splitScreen}>分屏编辑模式</button>
                <div className="readme">注：分屏模式将会打开两个并排窗口，左边是文档预览，右边是编辑器。</div>
            </div>
        );
    }
}

export default Markdown;
