import gg from '../js/canvas/2d.js';
import ft from '../js/text/filltext.js';

ft({text: 'Tap to create circles'});

let circles = [];

gg.on('tap', e => {
    let { x, y } = e;
    let r = 0;
    circles.push({ x, y, r });
});

gg.on('tick', e => {
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
        let { x, y, r } = circle;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
    });
});
