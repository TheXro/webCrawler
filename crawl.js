const normalizeURL = (url) => {
    const newURL = new URL(url);
    let fullPath = `${newURL.host}${newURL.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}



module.exports = {
    normalizeURL
}

