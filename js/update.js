import { emit } from './events.js';

let t = 0;
let dt = 17;

let update = (time) => {
    dt = time - t;
    t = time;
    emit('update', {t, dt});
};

export default update;
