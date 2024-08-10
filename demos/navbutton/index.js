import gg from '../../js/canvas/2d.js';
import ft from '../../js/draw/text.js';
import path from '../../js/draw/path.js';

gg.emit('color', { bg: 'navy', fill: 'white' });

gg.on('draw', ft({text: 'WIP: /js/draw/path.js'}).draw);

let navbutton = path({
    url: new URL('../../img/nav.svg', import.meta.url),
    //paths: ['M 0 0 L 1024 0 L 1024 1024 L 0 1024 Z'],
    w: 100,
    h: 100
});

gg.on('resize', (e) => {
    let { vw, vh } = e;
    navbutton.x = vw / 2;
    navbutton.y = vh / 2;
});
gg.emit('resize', gg.last('resize'));

gg.on('step', (e) => {
    navbutton.a = e.t * 0.1 % 360;
});

gg.on('draw', (e) => {
    let { ctx } = e;
    navbutton.draw(e);
});
