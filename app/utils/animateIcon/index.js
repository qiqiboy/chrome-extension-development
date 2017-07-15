const chrome = window.chrome;
const originImg = new Image();
const defaultIconUrl = window.chrome.runtime.getURL('icons/icon_16.png');

originImg.src = defaultIconUrl;

export default {
    running: false,
    angle: 0,

    start() {
        this.running = true;

        this.render();
    },

    stop() {
        this.running = false;
        this.angle = 0;

        clearTimeout(this.timer);

        chrome.browserAction.setIcon({
            path: defaultIconUrl
        });
    },

    render() {
        const imageData = this.getImageData();

        chrome.browserAction.setIcon({
            imageData
        });

        this.angle = (this.angle + 5) % 360;

        this.timer = setTimeout(this.render.bind(this), 100);
    },

    getImageData() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.height = 32;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(originImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
}
