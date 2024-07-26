// gg can be anything you want
// use it for namespacing
import gg from '../js/canvas.js';

// documentation
console.log(gg);

gg.emit('color', { bg: 'black' });

let circles = [];

gg.on('tap', e => {
    let { x, y } = e;
    let r = 0;
    let si = circles.length % 3;
    let stroke = ['red', 'green', 'blue'][si];
    circles.push({ x, y, r, stroke });
});

gg.on('update', e => {
    let { dt } = e; // dt = delta time in milliseconds
    let grow = dt / 1000 * 80; // 80 pixels per second
    let { vw, vh } = gg.last('resize');

    circles = circles.filter(circle => {
        circle.r += grow;
        let dx = Math.max(circle.x, vw - circle.x);
        let dy = Math.max(circle.y, vh - circle.y);
        let maxRadius = Math.sqrt(dx * dx + dy * dy);
        return circle.r < maxRadius;
    });

    if (circles.length === 0) {
        let { x = vw / 2, y = vh / 2 } = gg.last('tap');
        gg.emit('tap', { x, y });
    }
});

gg.on('draw', e => {
    let { ctx } = e;
    circles.forEach(circle => {
        let { x, y, r, stroke } = circle;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        gg.emit('color', { stroke });
        ctx.stroke();
    });
});
