import gg from '../../js/canvas/2d.js';
import ft from '../../js/draw/text.js';

// very quick and dirty text
gg.on('draw', ft({text: 'Tap to create circles'}).draw);

// And now circles!
let circles = [];

// Add a circle on tap
gg.on('tap', (e) => {
    let { x, y } = e;
    let r = 0;
    circles.push({ x, y, r });
});

// Grow the circles
gg.on('step', (e) => {
    let { dt } = e; // dt = delta time in milliseconds
    let grow = dt / 1000 * 80; // 80 pixels per second
    let { vw, vh } = gg.last('resize');

    // Remove circles that are too big
    circles = circles.filter((circle) => {
        circle.r += grow;
        let dx = Math.max(circle.x, vw - circle.x);
        let dy = Math.max(circle.y, vh - circle.y);
        let maxRadius = Math.sqrt(dx * dx + dy * dy);
        return circle.r < maxRadius;
    });

    // If no circles, add one
    if (circles.length === 0) {
        let { x = vw / 2, y = vh / 2 } = gg.last('tap');
        gg.emit('tap', { x, y });
    }
});

// Draw the circles to the canvas
gg.on('draw', (e) => {
    let { ctx } = e;
    circles.forEach(circle => {
        let { x, y, r } = circle;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
    });
});
