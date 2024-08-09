const svgcache = {};

export default (url) => {
    if (svgcache[url]) {
        return Promise.resolve(svgcache[url]);
    }
    
    return fetch(url).then((res) => {
        return res.text();
    }).then((svg) => {
        svgcache[url] = svg;
        return svg;
    });
};
