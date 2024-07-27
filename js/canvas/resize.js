let resize = () => {
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let vc = window.devicePixelRatio;
    return { vw, vh, vc };
};

export default resize;
