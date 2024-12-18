const isEmpty = require('./isEmpty');

describe('isEmpyt',()=>{
    it('should return false if object or array is not empty',()=>{
        const mockedObject = {key1: 'test', key2: 'hello world'};
        const mockedArray = ['lorem','ipsum'];

        const answerObject = isEmpty(mockedObject);
        const answerArray = isEmpty(mockedArray);

        expect(answerObject).toBe(false);
        expect(answerArray).toBe(false);
    })
    it('should return true if object or array is empty',()=>{
        const mockedObject = {};
        const mockedArray = [];

        const answerObject = isEmpty(mockedObject);
        const answerArray = isEmpty(mockedArray);

        expect(answerObject).toBe(true);
        expect(answerArray).toBe(true);
    })
    it('should return false if obj is not a object or array',()=>{
        const mockedArray = "";

        const answer = isEmpty(mockedArray);
        expect(answer).toBe(false);
    })
})