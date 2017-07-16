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
            this.refs.removeme.parentNode.removeChild(this.refs.removeme);
        }, 300);
    }

    render() {
        return (
            <div className='popup-root'>
                <h3 className="page-title">Chrome Extension</h3>
                <Tabs />
                <div className="footer">v{manifest.version} | &copy; 2017 <Link href="https://github.com/qiqiboy">@qiqiboy</Link></div>
                <div ref="removeme" style={{opacity: 0}}>remove</div>
            </div>
        );
    }
}

export default Popup;
