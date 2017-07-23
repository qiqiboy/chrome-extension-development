import React, { Component } from 'react';
import OptionItem from '../../components/OptionItem';
import './style.scss';

const chrome = window.chrome;

class Markdown extends Component {
    state = {}

    componentDidMount() {
        this.enable(true);
    }

    edit = () => {
        chrome.runtime.sendMessage({
            action: 'markdown-edit',
            code: this.props.code
        });
    }

    enable = enabled => {
        this.setState({
            enabled
        }, () => {
            document.body.classList[this.state.enabled ? 'add' : 'remove']('markdown-viewer');
        });
    }

    render() {
        return (
            <div className="markdown-root">
                <div className="options">
                    <OptionItem active={this.state.enabled} onChange={this.enable}>
                        {this.state.enabled ? '打开预览' : '关闭预览'}
                    </OptionItem>
                    <button onClick={this.edit}>编辑</button>
                </div>
                <div className="viewer" dangerouslySetInnerHTML={{__html: '<div class="markdown-body">' + this.props.html + '</div>'}}></div>
            </div>
        );
    }
}

export default Markdown;
