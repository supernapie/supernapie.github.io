let listeners = {};

export let on = (type, callback, context) => {
    if (!listeners[type]) {
        listeners[type] = [];
    }
    listeners[type].push({ callback, context })
};

export let off = (type, callback, context) => {
    if (!type) {
        listeners = {};
        return;
    }
    if (!listeners[type]) {
        return;
    }
    if (!callback) {
        listeners[type] = [];
        return;
    }
    if (!context) {
        listeners[type] = listeners[type].filter(listener => listener.callback !== callback);
        return;
    }
    listeners[type] = listeners[type].filter(listener => listener.callback !== callback || listener.context !== context);
};

export let once = (type, callback, context) => {
    let disposableCallback = e => {
        callback(e, context);
        off(type, disposableCallback, context);
    };
    on(type, disposableCallback, context);
};

export let emit = (type, e) => {
    if (!listeners[type]) {
        return;
    }
    listeners[type].forEach(listener => listener.callback(e, listener.context));
};
