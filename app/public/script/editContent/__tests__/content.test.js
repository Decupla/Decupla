import { checkIfExists, getId } from '../modules/content';

describe('checkIfExists', () => {
    it('should return match for if url is valid', () => {
        const path = '/content/edit/1';
        const result = checkIfExists(path);
        expect(result[1]).toBe('1');
    });

    it('should return null for invalid url', () => {
        const path = '/content/edit/test';
        const result = checkIfExists(path);
        expect(result).toBeNull();
    });
});

describe('getId', () => {
    it('should return correct ID from url', () => {
        const path = '/content/edit/1';
        const result = getId(path);
        expect(result).toBe(1);
    });
});
