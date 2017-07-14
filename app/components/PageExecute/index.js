import React, { Component } from 'react';
import OptionItem from '../OptionItem';
import { sendActiveTabRequest } from '../../utils/request';
import { getCurrent } from '../../utils/tabUtil';
import URL from 'url';
import './style.scss';

const chrome = window.chrome;

class Execute extends Component {
    state = {}

    async componentDidMount() {
        const editor = await import('codemirror'); //异步载入编辑器代码
        await import('codemirror/mode/javascript/javascript');
        await import('codemirror/mode/css/css');
        await import('codemirror/lib/codemirror.css'); //载入编辑器样式
        await import('codemirror/theme/solarized.css') //载入编辑器主题

        this.jsEditor = new editor(this.refs.jseditor, {
            mode: 'javascript',
            lineNumbers: true,
            theme: 'solarized',
            value: `// 输入要执行的js代码
document.body.style.background = 'red';
console.log('executed!');`
        });

        this.cssEditor = new editor(this.refs.csseditor, {
            mode: 'css',
            lineNumbers: true,
            theme: 'solarized',
            value: `body {
    background: red !important;
}`
        });

        const tab = await getCurrent();
        if (URL.parse(tab.url).host.toLowerCase() !== 'github.com') {
            this.setState({
                disabledExec: true
            });
        }
    }

    executeJS = () => {
        const code = this.jsEditor.getValue();
        if (this.state.inline) {
            sendActiveTabRequest({
                action: 'executeScript',
                code
            });
        } else {
            chrome.tabs.executeScript(null, {
                code
            });
        }
    }

    executeCSS = () => {
        const code = this.cssEditor.getValue();
        if (this.state.inline) {
            sendActiveTabRequest({
                action: 'insertCSS',
                code
            });
        } else {
            chrome.tabs.insertCSS(null, {
                code
            });
        }
    }

    optionChange = inline => {
        this.setState({
            inline
        });
    }

    render() {
        return (
            <div className="execute">
                <OptionItem active={this.state.inline} onChange={this.optionChange}>内联注入</OptionItem>
                <h3>JS</h3>
                <div ref="jseditor"></div>
                {this.state.disabledExec ? <button className="btn btn-success" disabled>只能对github网站进行代码注入</button> :
                <button className="btn btn-success" onClick={this.executeJS}>执行</button>}
                <h3>Css</h3>
                <div ref="csseditor"></div>
                {this.state.disabledExec ? <button className="btn btn-success" disabled>只能对github网站进行代码注入</button> :
                <button className="btn btn-success" onClick={this.executeCSS}>执行</button>}
            </div>
        );
    }
}

export default Execute;
