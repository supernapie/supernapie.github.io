import css from '../css.js';
css(new URL('../../css/opensans.css', import.meta.url));

export default (options) => {
    let defaults = {
        text: '',
        x: 10,
        y: 20,
        font: `16px 'opensans', sans-serif`,
        w: 0
    };
    Object.assign(defaults, options);
    Object.assign(options, defaults);
    options.draw = e => {
        let { ctx } = e;
        let { text, x, y, font } = options;
        ctx.font = font;
        ctx.fillText(text, x, y);
        options.w = ctx.measureText(text).width;
    };
    return options;
};
