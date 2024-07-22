let canvas = {width: 320, height: 320};

if (typeof document !== 'undefined') {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
}

export {canvas};
