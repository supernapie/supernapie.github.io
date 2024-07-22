import { on, off, once, emit } from './events.js';
import { canvas } from './canvas.js';

let gg = {
    vw: 320,
    vh: 320,
    pxR: 1,
    on,
    off,
    once,
    emit,
    canvas
};

on('resize', e => {
    Object.assign(gg, e);
});

emit('ready');

export default gg;
