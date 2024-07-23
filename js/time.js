import { emit, once } from './events.js';
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
    if (!ctx) {
        return;
    }
    ctx.save();
    emit('draw', ctx);
    ctx.restore();
};

once('ready', () => {
    if (typeof document === 'undefined') {
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
