// gg can be anything you want
// use it for namespacing
import gg from '../js/canvas/2d.js';
import ft from '../js/draw/text.js';

// documentation
console.log(gg);

gg.emit('color', { bg: 'black' });

let instructions = ft({text: 'Tap to create circles'});
instructions.x = gg.last('resize').vw;
gg.on('step', e => {
    let { dt } = e; // dt = delta time in milliseconds
    let vx = dt / 1000 * 60; // 60 pixels per second
    let { vw, vh } = gg.last('resize');
    instructions.x -= vx;
    if (instructions.x < -instructions.w) {
        instructions.x = vw;
    }
});

let circles = [];

gg.on('tap', e => {
    let { x, y } = e;
    let r = 0;
    let si = circles.length % 3;
    let stroke = ['red', 'green', 'blue'][si];
    circles.push({ x, y, r, stroke });
    // change text color to match
    gg.emit('color', { fill: stroke });
});

gg.on('step', e => {
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
        // repeat last tap event
        let { x = vw / 2, y = vh / 2 } = gg.last('tap');
        gg.emit('tap', { x, y });
    }
});

gg.on('draw', e => {
    let { ctx } = e;
    instructions.draw(e);
    circles.forEach(circle => {
        let { x, y, r, stroke } = circle;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        gg.emit('color', { stroke });
        ctx.stroke();
    });
});
