import React, { Component, PropTypes } from 'react';
import './style.scss';

const chrome = window.chrome;

class WorkSpace extends Component {
    constructor(props) {
        super(props);

        let list;
        try {
            list = JSON.parse(localStorage.getItem('chrome-extension-development-workspace'));
        } catch (e) {
            list = null;
        }

        this.state = { list };
    }

    saveData(list) {
        localStorage.setItem('chrome-extension-development-workspace', JSON.stringify(list));

        this.setState({
            list,
            error: null
        });
    }

    saveWork = () => {
        const name = this.refs.name.value;

        if (!name) {
            return this.setState({
                error: '请输入要保存的名字'
            });
        }

        chrome.windows.getCurrent({
            populate: true
        }, win => {
            const tabs = win.tabs.map(tab => tab.url);
            const work = {
                tabs,
                createdTime: Date.now(),
                name
            }

            if (this.state.list) {
                const newList = this.state.list.filter(item => item.name !== name);
                newList.unshift(work);

                this.saveData(newList);
            } else {
                this.saveData([work]);
            }

            this.refs.name.value = '';
        })
    }

    remove(win) {
        const newList = this.state.list.filter(item => item.name !== win.name);
        this.saveData(newList);
    }

    open(win) {console.log(win)
        chrome.windows.create({
            url: win.tabs
        });
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);

        return [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ].join('-') + ' ' + [
            date.getHours(),
            date.getMinutes()
        ].join(':')
    }

    render() {
        const {list, error} = this.state;

        return (
            <div className="workspace">
                <div className="add">
                    <div className="input-wrap">
                        <input type="text" ref="name" placeholder="输入要保存的名字" />
                    </div>
                    <button className="btn btn-success btn-search" onClick={this.saveWork}>添加</button>
                </div>
                {error && <div className="error">{error}</div>}
                {list ? <div className="list">{list.map(item => <div key={item.name} className="workspace-item">
                    <div className="name">{item.name}</div>
                    <div className="time">{this.formatDate(item.createdTime)}</div>
                    <div className="operate">
                        <button className="btn btn-remove" onClick={this.remove.bind(this, item)}>删除</button>
                        <button className="btn btn-open" onClick={this.open.bind(this, item)}>打开</button>
                    </div>
                </div>)}</div> : null}
            </div>
        );
    }
}

export default WorkSpace;
