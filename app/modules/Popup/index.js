import React, { Component } from 'react';
import Link from '../../components/Link';
import manifest from 'extension/manifest.json';
import Tabs from './Tabs';
import './style.scss';

class Popup extends Component {
    componentDidMount() {
        //为什么多此一举？
        //页面css是由js创建插入的，这样子容易导致chrome的browser action弹出窗口计算错误尺寸
        //这么做是触发其重新计算窗口样式
        setTimeout(() => {
            this.refs.root.classList.add('trigger-win-resize');
        }, 300);
    }

    render() {
        return (
            <div className='popup-root' ref="root">
                <h3 className="page-title">Chrome Extension</h3>
                <Tabs />
                <div className="footer">v{manifest.version} | &copy; 2017 <Link href="https://github.com/qiqiboy">@qiqiboy</Link></div>
            </div>
        );
    }
}

export default Popup;
