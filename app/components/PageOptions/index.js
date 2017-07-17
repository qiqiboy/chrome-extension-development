import React, { Component } from 'react';
import OptionItem from '../OptionItem';
import * as request from '../../utils/request';
import Options from '../../utils/options';
import * as tabUtil from '../../utils/tabUtil';
import InfoItem from '../InfoItem';
import QRcode from 'qrcode';
import './style.scss';

const chrome = window.chrome;

class PageOptions extends Component {
    //同步获取设置
    state = Options.getSync();

    componentWillMount() {
        this.fetchOptions();
        this.getTabInfo();

        //监听窗口激活，更新设置项
        //这里是考虑到同时打开多个设置项页面，也可以保持设置同步
        chrome.runtime.onMessage.addListener(data => {
            if (data.action === 'active') {
                this.fetchOptions();
            }
        });
    }

    async fetchOptions() {
        //异步获取设置
        const options = await Options.getAsync();
        this.setState(options);
    }

    async setOption(key, value) {
        //调用background中的保存设置方法
        const options = await Options.setAsync(key, value);

        //设置完成后向当前页面广播设置更新消息
        //页面的content scripts中也添加了监听器，当捕获到该条广播时，会根据相关设置调整页面显示
        request.sendActiveTabRequest({
            action: 'updateOption',
            options
        });

        request.sendRuntimeMessage({
            action: 'optionUpdated'
        });

        //同步组件状态中的设置项，以触发组件展示更新
        this.setState({
            [key]: value
        });
    }

    async getTabInfo() {
        const allTabs = await tabUtil.getAll();
        const curTab = await tabUtil.getCurrent();
        this.setState({
            curTab: {
                index: curTab.index + 1,
                url: curTab.url,
                title: curTab.title
            }
        });

        this.createQrcode(curTab.url);

        this.setState({
            allTabs: allTabs.length
        });
    }

    createQrcode(text) {
        QRcode.toDataURL(text, {
            color: {
                dark: '#a94442', // Blue dots
                light: '#fff' // Transparent background
            },
        }, (err, qrcode) => {
            this.setState({
                qrcode
            });
        })
    }

    tabUtil = {
        openGithubInNewTab() {
            chrome.tabs.create({
                url: 'https://github.com/qiqiboy'
            });
        },
        async openGithubInCurTab() {
            const tab = await tabUtil.getCurrent();
            chrome.tabs.update(tab.id, {
                url: 'https://github.com/qiqiboy'
            });
        },
        async createBlankTab() {
            const tab = await tabUtil.getCurrent();
            chrome.tabs.create({
                index: tab.index + 1
            });
        },
        async closeCurTab() {
            const tab = await tabUtil.getCurrent();
            chrome.tabs.remove(tab.id);
        },
        createNewWindow() {
            chrome.windows.create();
        },
        closeCurWindow() {
            chrome.windows.getCurrent(null, win => {
                chrome.windows.remove(win.id);
            });
        },
        zoomMoveMaxCurWindow() {
            const screen = window.screen;
            window.close(); //关闭popup窗口

            // 获取当前窗口的信息，最后需要根据这个信息恢复窗口位置、尺寸
            chrome.windows.getCurrent(null, win => {
                //要执行的步骤更新的窗口信息
                const steps = [{
                    state: 'normal'
                }, {
                    state: 'minimized'
                }, {
                    state: 'normal'
                }, {
                    width: 500,
                    height: 500,
                    top: screen.availTop,
                    left: screen.availLeft
                }, {
                    top: screen.availTop + screen.availHeight - 500,
                    left: screen.availLeft + screen.availWidth - 500
                }, {
                    state: 'fullscreen'
                }, {
                    state: 'normal'
                }, {
                    state: 'maximized'
                }, {
                    width: win.width,
                    height: win.height,
                    left: win.left,
                    top: win.top,
                    focused: true
                }];

                chrome.runtime.sendMessage({
                    action: 'updateWindow',
                    steps
                });
            });
        }
    }

    render() {
        const { curTab, allTabs, qrcode, ...options } = this.state;

        return (
            <div>
                {curTab && <div className="cur-tab-info">
                    <InfoItem label="标题" content={curTab.title} />
                    <InfoItem label="地址" content={curTab.url} />
                    <InfoItem label="次序" content={`总tab数：${allTabs}，当前：${curTab.index}`} />
                    <img src={qrcode} width="100" className="qrcode" alt="qrcode" />
                </div>}
                <OptionItem active={options.enableSkin} onChange={this.setOption.bind(this, 'enableSkin')}>
                    {options.enableSkin ? '黑色皮肤已启用' : '未启用黑色皮肤'}
                </OptionItem>

                <OptionItem active={options.clearMode} onChange={this.setOption.bind(this, 'clearMode')}>
                    {options.clearMode ? '清爽模式' : '正常模式'}
                </OptionItem>

                <OptionItem active={options.fullscreen} onChange={this.setOption.bind(this, 'fullscreen')}>
                    {options.fullscreen ? '全屏模式' : '非全屏模式'}
                </OptionItem>

                <div className="btn-group">
                    <button className="btn-option-item btn btn-success" onClick={this.tabUtil.openGithubInNewTab}>新标签页中访问Github</button>
                    <button className="btn-option-item btn btn-success" onClick={this.tabUtil.openGithubInCurTab}>当前标签页中访问Github</button>
                    <button className="btn-option-item btn btn-success" onClick={this.tabUtil.createBlankTab}>创建新标签页</button>
                    <button className="btn-option-item btn btn-success" onClick={this.tabUtil.closeCurTab}>关闭当前标签页</button>
                    <button className="btn-option-item btn btn-success" onClick={this.tabUtil.createNewWindow}>创建新窗口</button>
                    <button className="btn-option-item btn btn-success" onClick={this.tabUtil.closeCurWindow}>关闭当前窗口</button>
                    <button className="btn-option-item btn btn-success" onClick={this.tabUtil.zoomMoveMaxCurWindow}>缩小移动最大化当前窗口</button>
                    <button className="btn-option-item btn btn-success" onClick={tabUtil.moveCurTabLast}>将当前标签页移动到最后面</button>
                    <button className="btn-option-item btn btn-success" onClick={tabUtil.moveCurTabFirst}>将当前标签页移动到最前面</button>
                    <button className="btn-option-item btn btn-success" onClick={tabUtil.copyCurWindow}>复制当前窗口</button>
                </div>

                <OptionItem active={options.animateIcon} onChange={this.setOption.bind(this, 'animateIcon')}>
                    {options.animateIcon ? '动态icon' : '静态icon'}
                </OptionItem>
            </div>
        );
    }
}

export default PageOptions;
