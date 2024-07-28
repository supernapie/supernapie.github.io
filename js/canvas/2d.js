import events from '../events.js';

let {on, off, once, emit, last} = events();

let canvas = false;
let ctx = false;

let addCss = async (fileName) => {
    let res = await fetch(new URL(fileName, import.meta.url));
    let text = await res.text();
    let style = document.createElement('style');
    style.innerHTML = text;
    document.head.appendChild(style);
};

let addCanvas = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
};

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

let tap = e => {
    let { clientX: x, clientY: y } = e;
    emit('tap', {x, y});
    return { x, y };
};

let color = () => {
    on('color', e => {
        let {fill, stroke} = e;
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
    });
    emit('color', { bg: 'black', fill: 'white', stroke: 'white' });
};

let t = 0;
let dt = 17;
let tick = (time) => {
    dt = time - t;
    t = time;
    emit('tick', {t, dt});
};

let draw = (ctx) => {
    ctx.restore();
    ctx.save();

    let {
        vw = 320,
        vh = 320,
        vc: scale = 1
    } = last('resize');

    ctx.scale(scale, scale);

    let {
        bg = 'black',
        fill = 'white',
        stroke = 'white'
    } = last('color');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, vw, vh);

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;

    emit('draw', {ctx});
};

if (typeof document !== 'undefined') {
    addCss('style.css');
    addCanvas();
    window.addEventListener('resize', resize);
    resize();
    color();

    window.addEventListener('pointerup', tap);

    let onF = time => {
        tick(time);
        draw(ctx);
        requestAnimationFrame(onF);
    };
    requestAnimationFrame(onF);
}

export default {canvas, on, off, once, emit, last};
