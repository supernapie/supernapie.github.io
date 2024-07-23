// gg can be anything you want
// use it for namespacing
import gg from '../js/index.js';

// documentation
//console.log(gg);

let ctx;
if (typeof gg.canvas.getContext === 'function') {
    ctx = gg.canvas.getContext('2d');
}

let fill = 'black';
let stroke = 'white';
let circles = [];
let addCircle = () => {
    let lifespan = Math.max(gg.vw, gg.vh) * 20;
    circles.push({
        x: gg.pointer.x,
        y: gg.pointer.y,
        lifespan,
        maxRadius: lifespan
    });
};

gg.on('update', () => {
    if (gg.pointer.justUp) {
        addCircle();
    }
    circles = circles.filter(circle => {
        circle.lifespan -= gg.time.delta;
        return circle.lifespan > 0;
    });
});

gg.on('draw', () => {
    if (!ctx) return;
    ctx.save();
    ctx.scale(gg.pxR, gg.pxR);

    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, gg.vw, gg.vh);

    ctx.strokeStyle = stroke;
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, (circle.maxRadius - circle.lifespan) / 10, 0, Math.PI * 2);
        ctx.stroke();
    });

    ctx.restore();
});
