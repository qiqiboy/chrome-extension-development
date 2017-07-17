import './style.scss';
import Options from '../../utils/options';
import './search';

const chrome = window.chrome;

class App {
    constructor() {
        this.checkOption();

        chrome.runtime.onMessage.addListener(data => {
            if (data.action === 'updateOption' || data.action === 'active') {
                this.checkOption();
            }

            if (data.action === 'executeScript') {
                this.executeScript(data.code);
            }

            if (data.action === 'insertCSS') {
                this.insertCSS(data.code);
            }
        });
    }

    enableSkin() {
        document.body.classList.add('chrome-extension-development-dark');
    }

    disabledSkin() {
        document.body.classList.remove('chrome-extension-development-dark');
    }

    enableClearMode() {
        document.body.classList.add('chrome-extension-development-clear');
    }

    disabledClearMode() {
        document.body.classList.remove('chrome-extension-development-clear');
    }

    enableFullscreen() {
        document.body.classList.add('chrome-extension-development-fullscreen');
    }

    disabledFullscreen() {
        document.body.classList.remove('chrome-extension-development-fullscreen');
    }

    async checkOption() {
        const options = await Options.getAsync();

        options.enableSkin ? this.enableSkin() : this.disabledSkin()
        options.clearMode ? this.enableClearMode() : this.disabledClearMode();
        options.fullscreen ? this.enableFullscreen() : this.disabledFullscreen();
    }

    executeScript(code) {
        const script = document.createElement('script');
        const head = document.getElementsByTagName('head')[0];

        script.textContent = code;
        //内联script标签，所以没有onload等事件。
        //如果是外链js文件，可以通过下方代码在代码插入执行后移除掉
        //script.onload = script.onerror = () => head.removeChild(script);

        head.appendChild(script);

        setTimeout(() => head.removeChild(script));
    }
    insertCSS(code) {
        const style = document.createElement('style');
        const head = document.getElementsByTagName('head')[0];

        style.type = 'text/css';
        style.textContent = code;

        head.appendChild(style);
    }
}

export default App;
