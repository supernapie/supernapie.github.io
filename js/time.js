import { emit, last } from './events.js';
import { canvas, ctx } from './canvas.js';

let t = 0;
let dt = 17;

let update = () => {
    let time = { t, dt };
    emit('update', time);
};

let draw = () => {
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

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, vw, vh);

    emit('draw', {ctx});
};

if (canvas) {
    let onF = time => {
        dt = time - t;
        t = time;
        update();
        draw();
        requestAnimationFrame(onF);
    };
    requestAnimationFrame(onF);
}

export { update };
