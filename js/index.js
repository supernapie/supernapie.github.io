import { on, off, once, emit } from './events.js';
import { ctx } from './canvas.js';
import { pointer } from './pointer.js';
import { update } from './time.js';

let gg = {
    vw: 320,
    vh: 320,
    vc: 1,
    t: 0,
    dt: 17,
    on,
    off,
    once,
    emit,
    pointer,
};

on('resize', e => {
    Object.assign(gg, e);
});

on('preupdate', e => {
    Object.assign(gg, e);
});

emit('ready');

export default gg;
