let tap = e => {
    let { clientX: x, clientY: y } = e;
    return { x, y };
};

export default tap;
