import svg from '../svg.js';

export default (options = {}) => {
    let ow = 0; // original width
    let oh = 0; // original height
    let defaults = {
        url: false,
        paths: [],
        x: 0,
        y: 0,
        w: 512,
        h: 512,
        a: 0, // 0-360
    };
    Object.assign(defaults, options);
    Object.assign(options, defaults);
    options.draw = e => {
        let { ctx } = e;
        let { paths, x, y, w, h, a } = options;
        let rad = a * Math.PI / 180;
        let cx = w / ow;
        let cy = h / oh;
        // transform matrix
        let m = new DOMMatrix([
            Math.cos(rad) * cx,
            Math.sin(rad) * cx,
            -Math.sin(rad) * cy,
            Math.cos(rad) * cy,
            x, y
        ]);
        // normalize matrix, puts the origin in the center
        let n = new DOMMatrix([1, 0, 0, 1, -ow / 2, -oh / 2]);
        let p = new Path2D();
        paths.forEach((path, i) => {
            let np = new Path2D();
            np.addPath(new Path2D(path), n);
            p.addPath(np, m);
        });
        ctx.fill(p);
    };
    if (!options.url) {
        ow = options.w;
        oh = options.h;
        return options;
    }
    svg(options.url).then((svgtext) => {
        let el = document.createElement('div');
        el.innerHTML = svgtext;
        el.querySelectorAll('path').forEach((path) => {
            options.paths.push(path.getAttribute('d'));
        });
        ow = Number(el.querySelector('svg').getAttribute('width').replace('px', '')) || 512;
        oh = Number(el.querySelector('svg').getAttribute('height').replace('px', '')) || 512;
    });
    return options;
};
