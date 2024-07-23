import {emit, once} from './events.js';

let canvas = false;
let ctx = false;

let resize = () => {
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let vc = window.devicePixelRatio;
    canvas.width = vw * vc;
    canvas.height = vh * vc;
    canvas.style.width = vw + 'px';
    canvas.style.height = vh + 'px';
    emit('resize', {vw, vh, vc});
};

let addCanvas = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    window.addEventListener('resize', resize);
    once('ready', resize);
};

let addCss = async (fileName) => {
    let res = await fetch(new URL(fileName, import.meta.url));
    let text = await res.text();
    let style = document.createElement('style');
    style.innerHTML = text;
    document.head.appendChild(style);
};

if (typeof document !== 'undefined') {
    addCss('canvas.css');
    addCanvas();
}

export {ctx, canvas};
