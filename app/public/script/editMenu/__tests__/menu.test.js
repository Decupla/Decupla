import { checkIfExists, getId } from '../modules/menu'; // Pfad zu deiner Datei

describe('checkIfExists', () => {
    it('should return true if path contains "edit" and a id', () => {
        const path = '/menus/edit/123';
        const result = checkIfExists(path);
        expect(result).toBe(true);
    });
    it('should return false if path does not contain "edit" and a id', () => {
        const path = '/menus/';
        const result = checkIfExists(path);
        expect(result).toBe(false);
    })
});