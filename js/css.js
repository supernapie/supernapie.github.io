export default (url) => {
    if (!document) {
        return;
    }
    if (document.querySelector(`link[href="${url}"]`)) {
        return;
    }
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
};
