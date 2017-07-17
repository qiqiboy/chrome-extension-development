import React, { Component } from 'react';
import * as request from '../../utils/request';
import { getCurrent } from '../../utils/tabUtil';
import InfoItem from '../InfoItem';
import './style.scss';

const chrome = window.chrome;

class Github extends Component {
    state = {};
    lastTime = 0;

    onChange = ev => {
        const value = ev.target.value;
        const now = Date.now();

        clearTimeout(this.timer);
        if (now - this.lastTime > 500) {
            this.getUser(value);
            this.lastTime = now;
        } else {
            this.timer = setTimeout(this.getUser.bind(this, value), 500 - now + this.lastTime);
        }
    }

    async getUser(value) {
        if (!value) {
            return this.setState({
                error: null,
                user: null,
                loading: false
            });
        }

        const [username, reponame] = value.split('/');

        //如果账号不变，则去筛选repo
        if (this.state.user && username === this.state.user.login) {
            return this.filterRepos(reponame);
        }

        this.setState({
            error: null,
            loading: true
        });

        let user, repos, error;

        try {
            const resp = await request.getUser(username);
            user = resp.data;
        } catch (err) {
            error = err;
        }

        if ((this.refs.user.value || '').split('/')[0] === username) {
            this.setState({
                loading: false,
                user,
                repos,
                error
            });

            if (!error) {
                this.getRepos(value, reponame);
            }
        }
    }

    async getRepos(user, reponame) {
        try {
            const resp = await request.getRepos(user);

            this.repos = resp.data;
        } catch (e) {
            this.repos = [];
        }

        this.filterRepos(reponame);
    }

    filterRepos(reponame) {
        if (reponame) {
            const pattern = new RegExp('.*' + reponame.replace(/./g, char => {
                return char + '.*';
            }), 'i');

            this.setState({
                repos: this.repos.filter(repo => pattern.test(repo.name))
            });
        } else {
            this.setState({
                repos: this.repos
            });
        }
    }

    async openRepoPage(repo, ev) {
        ev.preventDefault();

        const tab = await getCurrent();
        chrome.tabs.update(tab.id, {
            url: repo.html_url
        });
    }

    render() {
        const { error, loading, user, repos } = this.state;

        const repoComponent = repos ? repos.length ? repos.map(item => {
            return <div className="repo-item" key={item.id}><a href={item.html_url} onClick={this.openRepoPage.bind(this, item)}>{item.name}</a> <div className="desc">- {item.description}</div></div>;
        }) : '没找到相关仓库列表' : '加载中...';

        return (
            <div className="github">
                <input type="text" ref="user" className="form-control"
                    placeholder="输入github账号搜索" onChange={this.onChange} />
                {loading ? <div className="loading">加载中...</div> : null}
                {error && <div className="error">{error.message}</div>}
                {user && <div className="userinfo">
                    <a href={user.html_url} title="打开开发者Github主页" onClick={this.openRepoPage.bind(this, user)}>
                        <img src={user.avatar_url} className="avatar" width="100" alt="avatar" />
                    </a>
                    <InfoItem label="账号：" content={user.login} />
                    <InfoItem label="简介：" content={user.bio || '--'} />
                    <InfoItem label="公司：" content={user.company || '--'} />
                    <InfoItem label="项目数：" content={user.public_repos || '0'} />
                    <InfoItem label="关注数：" content={user.following || '0'} />
                    <InfoItem label="被关注数：" content={user.followers || '0'} />
                    <InfoItem label="仓库列表：" content={repoComponent} />
                </div>}
            </div>
        );
    }
}

export default Github;
