const generateUrl = require('../generateUrl');

describe('generateUrl',()=>{
    it('should convert to lowercase and replace spaces with hyphens', ()=>{
        const title = 'Hello World';
        const expected = 'hello-world';

        const url = generateUrl(title);
        expect(url).toBe(expected);
    });
    it('should replace umlauts', () => {
        const title = 'Ä Ö Ü ß';
        const expected = 'ae-oe-ue-ss';

        const url = generateUrl(title);
        expect(url).toBe(expected);
    });
    it('should remove special characters', () => {
        const title = 'Hello @ World!';
        const expected = 'hello-world';

        const url = generateUrl(title);
        expect(url).toBe(expected);
    });
    it('should remove hyphens from start end end', () => {
        const title = '-Hello World-';
        const expected = 'hello-world';

        const url = generateUrl(title);
        expect(url).toBe(expected);
    });
})