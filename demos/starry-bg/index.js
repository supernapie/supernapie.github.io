import gg from '../../js/canvas/2d.js';

// example for a static starfield texture

// set the size off the canvas 2048x2048 but display it in 512x512
gg.emit('resize', {vw: 512, vh: 512, vc: 4});
// halt the resizing of the canvas
gg.off('resize');

// set the color of the canvas
gg.emit('color', {
    bg: '#162832',
    stroke: '#e3e3e3',
    fill: '#e3e3e3'
});

let stars = [];
while (stars.length < 128) {
    let { vw, vh } = gg.last('resize');
    let x = 3 + Math.floor(Math.random() * vw - 3);
    let y = 3 + Math.floor(Math.random() * vh - 3);
    let r = Math.floor(Math.random() * 3) / 2;
    let alpha = Math.random() * 0.35 + 0.15;
    stars.push({ x, y, r, alpha });
}

// we draw only once
gg.once('draw', e => {
    let { ctx } = e;
    stars.forEach(star => {
        let { x, y, r, alpha } = star;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    });
    // we are done
    // halt the clearing of the canvas
    gg.off('clear');
});
