// gg can be anything you want
// use it for namespacing
import gg from '../js/index.js';

// documentation
console.log(gg);

let fill = 'black';
let stroke = 'white';
let circles = [];
let addCircle = () => {
    let { vw, vh } = gg.last('resize');
    let lifespan = Math.max(vw, vh) * 20;
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

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';

    let {vw, vh} = gg.last('resize');
    ctx.fillRect(0, 0, vw, vh);

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, (circle.maxRadius - circle.lifespan) / 10, 0, Math.PI * 2);
        ctx.stroke();
    });
});
