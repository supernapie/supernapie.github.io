import css from '../css.js';
css(new URL('../../css/canvas.css', import.meta.url));

import events from '../events.js';
let {on, off, once, emit, last} = events();

let canvas = false;
let ctx = false;

let addCanvas = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
};

let resize = e => {
    let { vw, vh, vc } = e;
    canvas.width = vw * vc;
    canvas.height = vh * vc;
    canvas.style.width = vw + 'px';
    canvas.style.height = vh + 'px';
};

let color = e => {
    let {fill, stroke} = e;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
};

let clear = e => {
    let {ctx} = e;

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

};

if (typeof document !== 'undefined') {
    addCanvas();

    on('resize', resize);
    window.addEventListener('resize', () => {
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let vc = window.devicePixelRatio;
        emit('resize', {vw, vh, vc});
    });
    emit('resize', {
        vw: window.innerWidth,
        vh: window.innerHeight,
        vc: window.devicePixelRatio || 1
    });
    window.addEventListener('pointerup', e => {
        let { clientX: x, clientY: y } = e;
        emit('tap', {x, y});
    });

    on('color', color);
    emit('color', { bg: 'black', fill: 'white', stroke: 'white' });

    on('clear', clear);

    let t = 0;
    let dt = 17;
    let onF = time => {
        dt = time - t;
        t = time;
        emit('step', {t, dt});
        emit('clear', {ctx});
        emit('draw', {ctx});
        requestAnimationFrame(onF);
    };
    requestAnimationFrame(onF);
}

export default { on, off, once, emit, last };
