import svg from '../svg.js';

export default (options = {}) => {
    let defaults = {
        url: false,
        paths: [],
        w: 0,
        h: 0
    };
    Object.assign(defaults, options);
    Object.assign(options, defaults);
    options.draw = e => {
        let { ctx } = e;
        let { paths } = options;
        let p = new Path2D();
        paths.forEach((path) => {
            p.addPath(new Path2D(path));
        });
        ctx.fill(p);
    };
    if (!options.url) {
        return options;
    }
    svg(options.url).then((svgtext) => {
        if (document) {
            let el = document.createElement('div');
            el.innerHTML = svgtext;
            el.querySelectorAll('path').forEach((path) => {
                options.paths.push(path.getAttribute('d'));
            });
            options.w = Number(el.querySelector('svg').getAttribute('width').replace('px', '')) || 0;
            options.h = Number(el.querySelector('svg').getAttribute('height').replace('px', '')) || 0;
        }
    });
    return options;
};
