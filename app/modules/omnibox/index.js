import { getCurrent } from '../../utils/tabUtil';

const chrome = window.chrome;

class Omnibox {
    constructor() {
        chrome.omnibox.onInputCancelled.addListener(this.resetDefaultSuggestion);
        chrome.omnibox.onInputChanged.addListener(this.onchange);

        chrome.omnibox.onInputEntered.addListener(this.onclick);
    }

    updateDefaultSuggestion = description => {
        chrome.omnibox.setDefaultSuggestion({
            description
        });
    }

    resetDefaultSuggestion = () => {
        this.updateDefaultSuggestion('输入要访问的github账号');
    }

    async goto(url) {
        const tab = await getCurrent();

        chrome.tabs.update(tab.id, { url });
    }

    onchange = (text, suggest) => {
        if (!text) {
            return this.resetDefaultSuggestion();
        }

        const slices = text.split('/').filter(Boolean);
        switch (slices.length) {
            case 2:
                this.updateDefaultSuggestion(`查看 <match>${slices[0]}</match> 的 <match>${slices[1]}</match> 仓库`);
                suggest(this.repoLinks.map(item => ({
                    content: `https://github.com/${slices[0]}/${slices[1]}${item.path}`,
                    description: item.desc.replace('%s', `<match>${slices[1]}</match>`) + ` <dim>-</dim> https://github.com/${slices[0]}/${slices[1]}${item.path}`
                })));
                break;
            case 1:
                this.updateDefaultSuggestion(`继续输入 <match>${slices[0]}</match><dim>/some_repo</dim> 可访问某个仓库信息`);

                suggest(this.userLinks.map(item => ({
                    content: `https://github.com/${slices[0]}${item.path}`,
                    description: item.desc.replace('%s', `<match>${slices[0]}</match>`) + ` <dim>-</dim> <url>https://github.com/${slices[0]}${item.path}</url>`
                })));
                break;
            default:
                this.updateDefaultSuggestion(`访问 <url>https://github.com/<match>${text}</match></url>`);
        }
    }

    onclick = text => {
        if(/^https?/.test(text)) {
            this.goto(text);
        } else {
            this.goto(`https://github.com/search?q=${text}`);
        }
    }

    userLinks = [
        { path: '', desc: '查看 %s 的个人主页' },
        { path: '?tab=repositories', desc: '查看 %s 的全部仓库列表(Repositories)' },
        { path: '?tab=stars', desc: '查看 %s 的收藏列表(StarS)' },
        { path: '?tab=followers', desc: '查看关注 %s 的用户(Follwers)' },
        { path: '?tab=following', desc: '查看 %s 关注的用户(Following)' }
    ]

    repoLinks = [
        {path: '', desc: '查看 %s 项目主页'},
        {path: '/commits', desc: '查看 %s 所有commits'},
        {path: '/issues', desc: '查看 %s 的issues'},
        {path: '/wiki', desc: '查看 %s 的wiki'}
    ]
}

export default Omnibox;
