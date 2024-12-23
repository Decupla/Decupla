const ucfirst = require('../ucfirst');

describe('ucfirst',()=>{
    it('should return the given string with the first letter uppercase',()=>{
        const mockedString = "test";
        const uppercaseString = ucfirst(mockedString);

        expect(uppercaseString).toBe("Test");
    })
})