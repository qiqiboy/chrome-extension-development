import React, { Component } from 'react';
import Link from '../../components/Link';
import manifest from 'extension/manifest.json';
import Tabs from './Tabs';
import './style.scss';

class Popup extends Component {
    render() {
        return (
            <div className='popup-root'>
                <h3 className="page-title">Chrome Extension</h3>
                <Tabs />
                <div className="footer">v{manifest.version} | &copy; 2017 <Link href="https://github.com/qiqiboy">@qiqiboy</Link></div>
            </div>
        );
    }
}

export default Popup;
