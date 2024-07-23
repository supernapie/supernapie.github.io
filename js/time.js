import { emit, once } from './events.js';
import { canvas } from './canvas.js';

let time = {
    elapsed: 0,
    delta: 17,
};

let tick = t => {
    emit('preupdate', t);
    emit('update', t);
    emit('postupdate', t);
    emit('predraw', t);
    emit('draw', t);
    emit('postdraw', t);
};

once('ready', () => {

    if (typeof document === 'undefined') {
        return;
    }
    let onF = t => {
        time.delta = t - time.elapsed;
        time.elapsed = t;
        tick(time);
        requestAnimationFrame(onF);
    };
    requestAnimationFrame(onF);
});

export { time };
