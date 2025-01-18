const normalizeUrl = require('../normalizeUrl');

describe('normalizeUrl', () => {
    it('should add slashes to start and end', () => {
        const rawUrl = 'home/test';
        const expected = '/home/test/';

        const url = normalizeUrl(rawUrl);
        expect(url).toBe(expected);
    });
    it('should remove multiple slashes', () => {
        const rawUrl = '///home/test';
        const expected = '/home/test/';

        const url = normalizeUrl(rawUrl);
        expect(url).toBe(expected);
    })
});