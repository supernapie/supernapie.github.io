import gg from '../../js/canvas/2d.js';
import path from '../../js/draw/path.js';

let navbutton = path({
    url: new URL('../../img/nav.svg', import.meta.url)
});

gg.on('draw', (e) => {
    let { ctx } = e;
    gg.emit('color', { fill: 'tomato' });
    navbutton.draw(e);
});
