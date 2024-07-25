import { emit } from './events.js';

let tap = e => emit('tap', e);

window.addEventListener('pointerup', e => tap({ x: e.clientX, y: e.clientY }));

export { tap };
