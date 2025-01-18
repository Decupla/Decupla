const normalizeUrl = require('./normalizeUrl');
const generateUrl = require('./generateUrl');

const processUrl = (data, validation, urlInput, title) => {
    if (urlInput && urlInput !== "") {
        data.url = urlInput;
        validation.validate("url", "noSpaces|min:3");
    } else if (title && title.trim() !== "") {
        data.url = generateUrl(title);
    } else {
        data.url = "";
        return;
    }

    data.url = normalizeUrl(data.url);
};

module.exports = processUrl;