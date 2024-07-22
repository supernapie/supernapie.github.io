let canvas = {width: 320, height: 320};

if (document) {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
}

export canvas;