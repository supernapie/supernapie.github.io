import gg from '../../js/canvas/2d.js';
import path from '../../js/draw/path.js';

let navbutton = path({
    url: new URL('../../img/nav.svg', import.meta.url)
});

let targetW = 100;

gg.on('draw', (e) => {
    let { ctx } = e;
    let { vc } = gg.last('resize');
    ctx.restore();
    ctx.save();
    let scale = targetW / navbutton.w * vc;
    ctx.scale(scale, scale);
    gg.emit('color', { fill: 'tomato' });
    navbutton.draw(e);
});
