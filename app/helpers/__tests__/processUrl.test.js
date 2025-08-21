const processUrl = require('../processUrl');
const normalizeUrl = require('../normalizeUrl');
const generateUrl = require('../generateUrl');

jest.mock('../normalizeUrl');
jest.mock('../generateUrl');

describe('processUrl', () => {
    let data;
    let validation;

    beforeEach(() => {
        data = { url: '' };
        validation = {
            validate: jest.fn(),
        };
        normalizeUrl.mockClear();
        generateUrl.mockClear();
    });

    it('should use urlInput and validate it', () => {
        const urlInput = 'about-us';
        const title = 'About Us';
        normalizeUrl.mockReturnValue('/about-us/');

        processUrl(data, validation, urlInput, title);

        expect(data.url).toBe('/about-us/');
        expect(validation.validate).toHaveBeenCalledWith('url', 'noSpaces|min:3');
        expect(normalizeUrl).toHaveBeenCalledWith(urlInput);
        expect(generateUrl).not.toHaveBeenCalled();
    });

    it('should generate URL from title if urlInput is empty', () => {
        const urlInput = '';
        const title = 'About Us';
        generateUrl.mockReturnValue('about-us');
        normalizeUrl.mockReturnValue('/about-us/');

        processUrl(data, validation, urlInput, title);

        expect(data.url).toBe('/about-us/');
        expect(validation.validate).not.toHaveBeenCalled();
        expect(generateUrl).toHaveBeenCalledWith(title);
        expect(normalizeUrl).toHaveBeenCalledWith('about-us');
    });

    it('should set url to an empty string if urlInput and title are empty', () => {
        const urlInput = '';
        const title = '';

        processUrl(data, validation, urlInput, title);

        expect(data.url).toBe('');
        expect(validation.validate).not.toHaveBeenCalled();
        expect(generateUrl).not.toHaveBeenCalled();
        expect(normalizeUrl).not.toHaveBeenCalled();
    });
});
