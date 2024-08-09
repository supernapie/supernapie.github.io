import gg from '../../js/canvas/2d.js';
import path from '../../js/draw/path.js';

let navbutton = path({
    url: new URL('../../img/nav.svg', import.meta.url),
    w: 48,
    h: 48
});

gg.on('step', (e) => {
    //navbutton.a = e.t * 0.1;
});

gg.on('draw', (e) => {
    let { ctx } = e;
    gg.emit('color', { fill: 'tomato' });
    navbutton.draw(e);
});
