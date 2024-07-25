// gg can be anything you want
// use it for namespacing
import gg from '../js/index.js';

// documentation
console.log(gg);

let circles = [];
let addCircle = e => {
    let { x, y } = e;
    let r = 0;
    circles.push({ x, y, r});
};

gg.on('tap', addCircle);

gg.on('update', time => {
    let speed = time.dt / 1000 * 80; // 80 pixels per second
    let { vw, vh } = gg.last('resize');
    circles = circles.filter(circle => {
        circle.r += speed;
        let dx = Math.max(circle.x, vw - circle.x);
        let dy = Math.max(circle.y, vh - circle.y);
        let maxRadius = Math.sqrt(dx * dx + dy * dy);
        return circle.r < maxRadius;
    });
    if (circles.length === 0) {
        let { x = vw / 2, y = vh / 2 } = gg.last('tap');
        gg.tap({ x, y });
    }
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
