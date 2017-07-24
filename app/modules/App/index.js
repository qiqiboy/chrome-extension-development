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
}

export default App;
