const normalizeUrl = require('./normalizeUrl');
const generateUrl = require('./generateUrl');

const processUrl = (data, validation, urlInput, title) => {
    if (urlInput && urlInput !== "") {
        data.url = urlInput;
        validation.validate("url", "noSpaces|min:3");
    }

    if (!('url' in data)) {
        data.url = generateUrl(title);
    }

    data.url = normalizeUrl(data.url);
};

module.exports = processUrl;