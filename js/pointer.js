import { emit, once, on } from './events.js';
import { canvas } from './canvas.js';

let pointer = {
    x: 0,
    y: 0,
    downX: 0,
    downY: 0,
    justDown: false,
    justUp: false,
    isDown: false
};
let viewportOffset;
let left;
let top;
let mouseEntered = false;
let x = 0;
let y = 0;

let setXY = e => {
    viewportOffset = canvas.getBoundingClientRect();
    left = viewportOffset.left;
    top = viewportOffset.top;
    x = (e.clientX - left);
    y = (e.clientY - top);
    pointer.x = x;
    pointer.y = y;
};

once('ready', () => {

    if (typeof document === 'undefined') {
        return;
    }

    canvas.addEventListener('pointerdown', e => {
        if (e.isPrimary === false) {
            return;
        }
        setXY(e);
        pointer.downX = x;
        pointer.downY = y;
        pointer.justDown = true;
        pointer.isDown = true;
        mouseEntered = false;
    });

    canvas.addEventListener('pointermove', e => {
        if (e.isPrimary === false) {
            return;
        }
        setXY(e);
    });

    canvas.addEventListener('pointerup', e => {
        if (mouseEntered) {
            mouseEntered = false;
            return;
        }
        if (e.isPrimary === false) {
            return;
        }
        setXY(e);
        pointer.justUp = true;
        pointer.isDown = false;
        emit('tap', {x, y});
    });

    canvas.addEventListener('pointerout', e => {
        if (pointer.isDown) {
            pointer.justUp = true;
            pointer.isDown = false;
        }
    });

    canvas.addEventListener('pointerenter', e => {
        mouseEntered = true;
    });

    on('postupdate', () => {
        pointer.justDown = false;
        pointer.justUp = false;
    });

    // TODO: Change canvas style cursor
});

export { pointer };
