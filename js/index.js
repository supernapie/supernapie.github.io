import { on, off, once, emit, last } from './events.js';
import { ctx } from './canvas.js';
import { pointer } from './pointer.js';
import { update } from './time.js';

let api = {
    on,
    off,
    once,
    emit,
    last,
    pointer,
};

emit('ready');

export default api;
