import { emit } from './events.js';

let tap = e => {
    let { clientX: x, clientY: y } = e;
    emit('tap', { x, y });
};

export default tap;
