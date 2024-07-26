import { emit } from './events.js';

let resize = () => {
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let vc = window.devicePixelRatio;
    emit('resize', {vw, vh, vc});
};

export default resize;
