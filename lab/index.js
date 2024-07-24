// gg can be anything you want
// use it for namespacing
import gg from '../js/index.js';

// documentation
console.log(gg);

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

gg.on('update', time => {
    if (gg.pointer.justUp) {
        addCircle();
    }
    circles = circles.filter(circle => {
        circle.lifespan -= time.dt;
        return circle.lifespan > 0;
    });
});

gg.on('draw', ctx => {
    ctx.scale(gg.vc, gg.vc);

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;

    ctx.fillRect(0, 0, gg.vw, gg.vh);

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, (circle.maxRadius - circle.lifespan) / 10, 0, Math.PI * 2);
        ctx.stroke();
    });
});
