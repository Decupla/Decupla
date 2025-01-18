const normalizeUrl = (rawUrl) => {
    return `/${rawUrl.replace(/^\/+|\/+$/g, '')}/`;
}

module.exports = normalizeUrl;