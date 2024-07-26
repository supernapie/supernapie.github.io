import {on, off, once, emit, last} from './events.js';
import update from './update.js';
import draw from './draw.js';
import tap from './tap.js';
import color from './color.js';
import resize from './resize.js';

let canvas = false;
let ctx = false;

let addCanvas = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
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
    on('color', e => {
        let {fill, stroke} = e;
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
    });
    color();
    window.addEventListener('pointerup', tap);
    on('resize', e => {
        let {vw, vh, vc} = e;
        canvas.width = vw * vc;
        canvas.height = vh * vc;
        canvas.style.width = vw + 'px';
        canvas.style.height = vh + 'px';
    });
    window.addEventListener('resize', resize);
    resize();
    let onF = time => {
        update(time);
        draw(ctx);
        requestAnimationFrame(onF);
    };
    requestAnimationFrame(onF);
}

export default {canvas, on, off, once, emit, last};
