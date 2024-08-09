import gg from '../js/canvas/2d.js';
import ft from '../js/draw/text.js';

// set background color
// We can emit this once or change it later
gg.emit('color', { bg: 'black' });

let instructions = ft({
    text: 'Tap to create circles',
    x: gg.last('resize').vw
});
// animate instructions from right to left
gg.on('step', e => {
    let { dt } = e; // dt = delta time in milliseconds
    let vx = dt / 1000 * 60; // 60 pixels per second
    let { vw, vh } = gg.last('resize');
    instructions.x -= vx;
    if (instructions.x < -instructions.w) {
        instructions.x = vw;
    }
});
// Add the draw call to the canvas draw listeners
// Note: this isn't done automatically for draw objects
// So we can control them with on, off and once
gg.on('draw', instructions.draw);

let circles = [];

gg.on('tap', e => {
    let { x, y } = e;
    let r = 0;
    let circle = { x, y, r };
    // store stroke color for each circle
    let si = circles.length % 3;
    let stroke = ['red', 'green', 'blue'][si];
    circle.stroke = stroke;
    circles.push(circle);
    // change (text) fill color to match latest circle
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
    circles.forEach(circle => {
        let { x, y, r, stroke } = circle;
        // On ctx we can use all the canvas 2d context methods
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        // And change stroke color with an emission
        gg.emit('color', { stroke });
        ctx.stroke();
    });
});
