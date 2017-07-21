import React, { Component } from 'react';
import Options from '../../components/PageOptions';
import Github from '../../components/PageGithub';
import Execute from '../../components/PageExecute';
import WorkSpace from '../../components/PageWorkSpace';
import Markdown from '../../components/PageMarkdown';

const tabData = [{
        id: 'options',
        title: '页面设置',
        component: Options
    },
    {
        id: 'github',
        title: 'Github',
        component: Github
    },
    {
        id: 'execute',
        title: '代码注入',
        component: Execute
    },
    {
        id: 'workspace',
        title: '工作区',
        component: WorkSpace
    },
    {
        id: 'markdown',
        title: 'Markdown',
        component: Markdown
    }
];

const lastId = localStorage.getItem('chrome-extension-popup-tab-id') || 'options';

class Tabs extends Component {
    state = {
        tab: tabData.find(item => item.id === lastId) || tabData[0]
    }

    switchTab(tab) {
        this.setState({
            tab
        });

        localStorage.setItem('chrome-extension-popup-tab-id', tab.id);
    }

    render() {
        const Component = this.state.tab.component;
        return (
            <div className="tabs-container">
                <div className="menus">
                    {tabData.map(tab => <a className={tab === this.state.tab ? 'active' : null} onClick={this.switchTab.bind(this, tab)} key={tab.id}>{tab.title}</a>)}
                </div>
                <Component />
            </div>
        );
    }
}

export default Tabs;
