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
let mouseEntered = false;

let setXY = e => {
    let viewportOffset = canvas.getBoundingClientRect();
    let left = viewportOffset.left;
    let top = viewportOffset.top;
    pointer.x = (e.clientX - left);
    pointer.y = (e.clientY - top);
};

once('ready', () => {

    if (!canvas) {
        return;
    }

    canvas.addEventListener('pointerdown', e => {
        if (e.isPrimary === false) {
            return;
        }
        setXY(e);
        pointer.downX = pointer.x;
        pointer.downY = pointer.y;
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
