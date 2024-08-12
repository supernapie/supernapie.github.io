import gg from '../../js/canvas/2d.js';
import ft from '../../js/draw/text.js';
import path from '../../js/draw/path.js';
import pointarea from '../../js/pointer/rect.js';

gg.emit('color', { bg: 'navy', fill: 'white' });

gg.on('draw', ft({text: 'path + pointer'}).draw);

let navbutton = path({
    url: new URL('../../img/nav.svg', import.meta.url),
    //url: new URL('../../img/gear.svg', import.meta.url),
    paths: ['M 0 0 L 1024 0 L 1024 1024 L 0 1024 Z'],
    fills: ['navy', 'white'],
    w: 100,
    h: 100
});
gg.on('draw', navbutton.draw);

pointarea(navbutton);

navbutton.pointer.on('startpointing', () => {
    navbutton.fills = ['white', 'navy'];
});

navbutton.pointer.on('stoppointing', () => {
    navbutton.fills = ['navy', 'white'];
});

navbutton.pointer.on('down', () => {
    gg.emit('color', { bg: 'white', fill: 'navy' });
});

navbutton.pointer.on('up', () => {
    gg.emit('color', { bg: 'navy', fill: 'white' });
});

gg.on('resize', (e) => {
    let { vw, vh } = e;
    navbutton.x = vw / 2 - navbutton.w / 2;
    navbutton.y = vh / 2 - navbutton.h / 2;
});
gg.emit('resize', gg.last('resize'));

gg.on('step', (e) => {
    navbutton.a = e.t * 0.1 % 360;
});
