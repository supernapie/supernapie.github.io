import gg from '../../js/canvas/2d.js';
import ft from '../../js/draw/text.js';

gg.emit('color', { bg: 'navy', fill: 'white' });

let someText = ft({text: 'hello world\nthis is a test'});

gg.on('draw', e => {
    someText.draw(e);
    let { x, y, w, h } = someText;
    e.ctx.strokeRect(x - 4, y - 4, w + 8, h + 8);
});
