let listeners = {};

export let on = (type, callback) => {
    if (!listeners[type]) {
        listeners[type] = [];
    }
    listeners[type].push(callback);
};

export let off = (type, callback) => {
    if (!type && !callback) {
        listeners = {};
        return;
    }
    if (type && !callback) {
        listeners[type] = [];
        return;
    }
    if (!type && callback) {
        for (let t in listeners) {
            listeners[t] = listeners[t].filter(listener => listener !== callback);
        }
        return;
    }
    if (listeners[type]) {
        listeners[type] = listeners[type].filter(listener => listener !== callback);
    }
};

export let once = (type, callback) => {
    let disposableCallback = e => {
        callback(e);
        off(type, disposableCallback);
    };
    on(type, disposableCallback);
};

let lastEmission = {};

export let emit = (type, e) => {
    lastEmission[type] = e;
    if (listeners[type]) {
        listeners[type].forEach(listener => listener(e));
    }
};

export let last = (type) => {
    if (!lastEmission[type]) {
        return {};
    }
    return lastEmission[type];
};
