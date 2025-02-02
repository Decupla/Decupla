const sanitizeFilename = require('../sanitizeFilename');

describe('sanitizeFilename', () => {
    it('should replace invalid characters with underscores',()=>{
        const filename = "Test !&^%$# FileÄÖÜ";
        const sanitizedFilename = sanitizeFilename(filename);
        expect(sanitizedFilename).toBe('Test________File___');
    })
})