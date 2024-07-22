import {emit} from './events.js';

let canvas = {width: 320, height: 320};

if (typeof document !== 'undefined') {
    fetch(new URL('canvas.css', import.meta.url)).then(response => {
        return response.text();
    }).then(text => {
        let style = document.createElement('style');
        style.innerHTML = text;
        document.head.appendChild(style);
    });
    canvas = document.createElement('canvas');
    let resize = () => {
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let pxR = window.devicePixelRatio;
        canvas.width = vw * pxR;
        canvas.height = vh * pxR;
        canvas.style.width = vw + 'px';
        canvas.style.height = vh + 'px';
        emit('resize', {vw, vh, pxR});
    };
    document.body.appendChild(canvas);
    window.addEventListener('resize', () => {
        resize();
    });
    resize();
}

export {canvas};
