const normalizeUrl = (rawUrl) => {
    return `/${rawUrl.toLowerCase().replace(/^\/+|\/+$/g, '')}/`;
}

module.exports = normalizeUrl;
