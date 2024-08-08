import gg from '../../js/canvas/2d.js';

gg.emit('color', {
    bg: '#162832',
    stroke: '#e3e3e3',
    fill: '#e3e3e3'
});

let stars = [];

while (stars.length < 500) {
    let { vw, vh } = gg.last('resize');
    let x = 3 + Math.floor(Math.random() * vw - 3);
    let y = 3 + Math.floor(Math.random() * vh - 3);
    let r = Math.floor(Math.random() * 5) / 2;
    let alpha = Math.random() * 0.85 + 0.15;
    stars.push({ x, y, r, alpha });
}

gg.on('draw', e => {
    let { ctx } = e;
    stars.forEach(star => {
        let { x, y, r, alpha } = star;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    });
});
