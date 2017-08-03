import React, { Component } from 'react';
import marked from 'marked';
import * as mdUtil from '../../utils/mdUtil';
import OptionItem from '../../components/OptionItem';
import './style.scss';

const chrome = window.chrome;
let lastId;

class Markdown extends Component {
    state = {}

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
        const screen = window.screen;

        chrome.runtime.sendMessage({
            action: 'markdown-edit-mode',
            html,
            screen: {
                availWidth: screen.availWidth,
                availTop: screen.availTop,
                availLeft: screen.availLeft,
                availHeight: screen.availHeight
            }
        });
    }

    openPreview = clicked => {
        if (clicked) {
            this.preview();
        }

        this.setState({
            clicked
        });
    }

    save2file = () => {
        const URL = window.URL || window.webkitURL;
        const code = this.editor.getValue();
        const blob = new window.Blob([code], {
            type: 'text/markdown'
        });
        const fileUrl = URL.createObjectURL(blob);

        if (lastId) {
            chrome.downloads.erase({
                id: lastId
            });
        }

        chrome.downloads.download({
            url: fileUrl,
            filename: 'chrome-extension-development-markdown.md',
            conflictAction: 'overwrite'
        }, dlId => {
            lastId = dlId;
        });
    }

    render() {

        return (
            <div className="markdown">
                <OptionItem active={this.state.clicked} onChange={this.openPreview}>直接开始编辑，或者点此打开预览页面</OptionItem>
                <div className="md-editor" ref="editor"></div>
                <button className="btn btn-success" onClick={this.splitScreen}>分屏编辑模式</button>
                <div className="readme">注：分屏模式将会打开两个并排窗口，左边是文档预览，右边是编辑器。</div>
                <button className="btn btn-success" onClick={this.save2file}>保存文件</button>
            </div>
        );
    }
}

export default Markdown;
