import css from '../css.js';

if (typeof document !== 'undefined') {
    css(new URL('style.css', import.meta.url));
}

export default (options) => {
    let defaults = {
        text: '',
        x: 10,
        y: 20,
        font: `16px 'opensans', sans-serif`,
        fill: undefined,
        w: 0
    };
    Object.assign(defaults, options);
    Object.assign(options, defaults);
    let draw = e => {
        let { ctx } = e;
        let { text, x, y, font, fill } = options;
        ctx.font = font;
        if (fill) {
            ctx.fillStyle = fill;
        }
        ctx.fillText(text, x, y);
        options.w = ctx.measureText(text).width;
    };
    let newDraw = draw;
    if (options.draw) {
        let oldDraw = options.draw;
        newDraw = e => {
            oldDraw(e);
            draw(e);
        };
    }
    options.draw = newDraw;
    return options;
};
