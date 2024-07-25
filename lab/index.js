// gg can be anything you want
// use it for namespacing
import gg from '../js/index.js';

// documentation
console.log(gg);

let circles = [];
let addCircle = () => {
    circles.push({
        x: gg.pointer.x,
        y: gg.pointer.y,
        r: 0
    });
};

gg.on('update', time => {
    if (gg.pointer.justUp) {
        addCircle();
    }
    let { vw, vh } = gg.last('resize');
    circles = circles.filter(circle => {
        circle.r += time.dt / 1000 * 80; // 80 pixels per second
        let dx = Math.max(circle.x, vw - circle.x);
        let dy = Math.max(circle.y, vh - circle.y);
        let maxRadius = Math.sqrt(dx * dx + dy * dy);
        return circle.r < maxRadius;
    });
});

gg.on('draw', ctx => {

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';

    let { vw, vh } = gg.last('resize');
    ctx.fillRect(0, 0, vw, vh);

    circles.forEach(circle => {
        let { x, y, r } = circle;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
    });
});
