const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const normalizeURL = (url) => {
    const newURL = new URL(url);
    let fullPath = `${newURL.host}${newURL.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

const getURLsFromHTML = (html, baseURL) => {
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll('a');
    const urls = []
    links.forEach(link => {
        const absLink = new URL(link.href, baseURL);
        urls.push(absLink.href);
    })
    return urls
}


module.exports = {
    normalizeURL,
    getURLsFromHTML
}

