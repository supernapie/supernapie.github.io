import { emit, once, last } from './events.js';
import { canvas, ctx } from './canvas.js';

let t = 0;
let dt = 17;

let update = () => {
    let time = { t, dt };
    emit('preupdate', time);
    emit('update', time);
    emit('postupdate', time);
};

let draw = () => {
    ctx.save();
    let { vc: scale = 1 } = last('resize');
    ctx.scale(scale, scale);

    emit('draw', ctx);

    ctx.restore();
};

once('ready', () => {
    if (!canvas) {
        return;
    }

    let onF = time => {
        dt = time - t;
        t = time;
        update();
        draw();
        requestAnimationFrame(onF);
    };
    requestAnimationFrame(onF);
});

export { update };
