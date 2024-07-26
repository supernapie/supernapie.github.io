import { on, off, once, emit, last } from './events.js';
import { ctx } from './canvas.js';
import { tap } from './tap.js';
import { update } from './time.js';

let api = {
    on,
    off,
    once,
    emit,
    last
};

export default api;
