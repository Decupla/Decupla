const APIKey = require('../origin');
const db = require('../../database/database');

const mockError = new Error('Database Mock Error');
let consoleSpy;

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
});

jest.mock('../../database/database', () => ({
    selectAll: jest.fn(),
    selectWhere: jest.fn(),
    insert: jest.fn(),
    updateWhere: jest.fn(),
    deleteWhere: jest.fn()
}));

describe('add', () => {
    it('should call db.insert and return new ID', async () => {
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);


        const data = { name: 'New mocked key', APIKey: 'GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat' };
        const result = await APIKey.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('origins', data);
    })
    it('shoud log errors and return null', async () => {
        db.insert.mockRejectedValue(mockError);

        const data = { name: 'New mocked key', APIKey: 'GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat' };
        const result = await APIKey.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ', mockError)
    })
})

describe('getAll', () => {
    it('should call db.selectAll and return found rows', async () => {
        const mockRows = [{ id: 1, name: 'Mocked key', APIKey: 'GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat' }];
        db.selectAll.mockResolvedValue(mockRows);

        const result = await APIKey.getAll();
        expect(result).toEqual(mockRows);
        expect(db.selectAll).toHaveBeenCalledWith('origins');
    }),
        it('should log errors and return empty array', async () => {
            db.selectAll.mockRejectedValue(mockError);

            const result = await APIKey.getAll();

            expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
            expect(result).toEqual([]);
        })
})

describe('get', () => {
    it('should call db.selectWhere with correct parameters and return found row', async () => {
        const mockRow = { id: 1, name: 'Mocked key', APIKey: 'GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat' };
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await APIKey.get(1);

        expect(result).toEqual(mockRow);
        expect(db.selectWhere).toHaveBeenCalledWith('origins', 'id', 1)
    });
    it('should log errors and return null', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const result = await APIKey.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
    });
})

describe('update', () => {
    it('should call db.updateWhere with correct parameters and return true', async () => {
        db.updateWhere.mockResolvedValue(true);

        const data = { name: 'Updated mocked key', APIKey: 'GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat' };
        const answer = await APIKey.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('origins', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors and return false', async () => {
        db.updateWhere.mockRejectedValue(mockError);

        const data = { name: 'Updated mocked key', APIKey: 'GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat' };
        const answer = await APIKey.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove', () => {
    it('should call db.deleteWhere with correct parameters and return true', async () => {
        db.deleteWhere.mockResolvedValue(true);

        const answer = await APIKey.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('origins', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors and return false', async () => {
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await APIKey.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('APIKeyValid', () => {
    it('should call db.selectWhere and return true if row was found', async () => {
        const mockRow = { id: 1, name: 'Mocked key', APIKey: 'GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat' };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await APIKey.APIKeyValid('GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat');

        expect(db.selectWhere).toHaveBeenCalledWith('origins','APIkey','GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat');
        expect(answer).toBe(true);
    })
    it('should return false if no row was found', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await APIKey.APIKeyValid('GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat');

        expect(answer).toBe(false);
    })
    it('should log errors and return false', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await APIKey.APIKeyValid('GgoeieCmbUnNJ5kfR32OMsuNkBF8rHat');

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(false);
    })
})