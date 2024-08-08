let addCss = async (url) => {
    let res = await fetch(url);
    let text = await res.text();
    let style = document.createElement('style');
    style.innerHTML = text;
    document.head.appendChild(style);
};

export default addCss;
