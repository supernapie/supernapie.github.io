let t = 0;
let dt = 17;

let update = (time) => {
    dt = time - t;
    t = time;
    return {t, dt};
};

export default update;
