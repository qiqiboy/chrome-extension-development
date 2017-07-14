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

        this.setState({
            error: null,
            loading: true
        });

        let user, repos, error;

        try{
            const resp = await request.getUser(value);
            user = resp.data;
        }catch(err) {
            error = err;
        }

        if (this.refs.user.value === value) {
            this.setState({
                loading: false,
                user,repos,error
            });

            if (!error) {
                this.getRepos(value);
            }
        }
    }

    async getRepos(user) {
        let repos;
        try{
            const resp = await request.getRepos(user);

            repos = resp.data;
        }catch(e) {
            repos = [];
        }

        this.setState({
            repos
        });
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

        const repoComponent = repos ? repos.map(item => {
            return <div className="repo-item" key={item.id}><a href={item.html_url} onClick={this.openRepoPage.bind(this, item)}>{item.name}</a> <div className="desc">- {item.description}</div></div>;
        }) : '加载中...';

        return (
            <div className="github">
                <input type="text" ref="user" className="form-control"
                    placeholder="输入github账号搜索" onChange={this.onChange} />
                {loading ? <div className="loading">加载中...</div> : null}
                {error && <div className="error">{error.message}</div>}
                {user && <div className="userinfo">
                    <img src={user.avatar_url} className="avatar" width="100" alt="avatar" />
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
