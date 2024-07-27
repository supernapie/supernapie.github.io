import events from '../events.js';
import color from './color.js';
import draw from './draw.js';
import resize from './resize.js';
import tap from './tap.js';
import update from './update.js';

let {on, off, once, emit, last} = events();

let canvas = false;
let ctx = false;

let addCanvas = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
};

let setCanvasSize = () => {
    let {vw, vh, vc} = resize();
    canvas.width = vw * vc;
    canvas.height = vh * vc;
    canvas.style.width = vw + 'px';
    canvas.style.height = vh + 'px';
    emit('resize', {vw, vh, vc});
};

let addCss = async (fileName) => {
    let res = await fetch(new URL(fileName, import.meta.url));
    let text = await res.text();
    let style = document.createElement('style');
    style.innerHTML = text;
    document.head.appendChild(style);
};

if (typeof document !== 'undefined') {
    addCss('style.css');
    addCanvas();
    on('color', e => {
        let {fill, stroke} = e;
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
    });
    emit('color', color());
    window.addEventListener('pointerup', e => {
        let {x, y} = tap(e);
        emit('tap', {x, y});
    });
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    let onF = time => {
        let {t, dt} = update(time);
        emit('update', {t, dt});
        draw(ctx, last('resize'), last('color'));
        emit('draw', {ctx});
        requestAnimationFrame(onF);
    };
    requestAnimationFrame(onF);
}

export default {canvas, on, off, once, emit, last};
