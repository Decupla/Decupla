const Collection = require('../collection');
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

describe('get', () => {
    it('should call db.selectWhere and return result', async () => {
        const mockedRow = { id: 1, title: 'Found Collection', key: 'found-collection' };
        db.selectWhere.mockResolvedValue(mockedRow);

        const result = await Collection.get(1);

        expect(result).toEqual(mockedRow);
        expect(db.selectWhere).toHaveBeenCalledWith('collections', 'id', 1);
    })
    it('should log errors and return null', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const result = await Collection.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError)
    })
})

describe('getAll', () => {
    it('should call db.selectAll and return the found rows', async () => {
        const mockedRows = [{ id: 1, title: 'New Collection', key: 'new-collection' }];
        db.selectAll.mockResolvedValue(mockedRows);

        const result = await Collection.getAll();

        expect(result).toEqual(mockedRows);
        expect(db.selectAll).toHaveBeenCalledWith('collections');
    })
    it('should log errors', async () => {
        db.selectAll.mockRejectedValue(mockError)

        const result = await Collection.getAll();

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError)
    })
})

describe('add', () => {
    it('should call db.insert with correct parameters and return the new id', async () => {
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);

        const data = { id: 1, title: 'New Collection', key: 'new-collection' };
        const result = await Collection.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('collections', data);
    })
    it('should log errors and return null', async () => {
        db.insert.mockRejectedValue(mockError)

        const data = { id: 1, title: 'New Collection', key: 'new-collection' }
        const result = await Collection.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ', mockError);
    })
})

describe('update', () => {
    it('should call db.updateWhere and return true on success', async () => {
        db.updateWhere.mockResolvedValue(true);

        const data = { id: 1, title: 'Updated Collection', key: 'updated-collection' };
        const answer = await Collection.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('collections', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('shoud log errors and return false', async () => {
        db.updateWhere.mockRejectedValue(mockError);

        const data = { id: 1, title: 'Updated Collection', key: 'updated-collection' };
        const answer = await Collection.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove', () => {
    it('should call db.deleteWhere and return true on success', async () => {
        db.deleteWhere.mockResolvedValue(true);

        const answer = await Collection.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('collections', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors and return false', async () => {
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await Collection.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('keyExists', () => {
    it('should call the selectWhere function of the database with correct parameters and return true if result is not null', async () => {
        const mockRow = { id: 1, title: 'New Collection', key: 'new-collection' };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Collection.keyExists('new-collection');

        expect(db.selectWhere).toHaveBeenCalledWith('collections', 'key', 'new-collection');
        expect(answer).toBe(true);
    })
    it('should return false if result is null', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await Collection.keyExists('new-collection');

        expect(db.selectWhere).toHaveBeenCalledWith('collections', 'key', 'new-collection');
        expect(answer).toBe(false);
    })
    it('should log errors and return false', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await Collection.keyExists('main-navigation');

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('keyChanged', () => {
    it('should call db.selectWhere and return false if result equals parameter', async () => {
        const mockRow = { id: 1, title: 'Found Collection', key: 'found-collection' };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Collection.keyChanged(1,'found-collection');

        expect(db.selectWhere).toHaveBeenCalledWith('collections','id',1);
        expect(answer).toBe(false);
    })
    it('should call db.selectWhere and return true if result does not equal parameter', async () => {
        const mockRow = { id: 1, title: 'Found Collection', key: 'found-collection' };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Collection.keyChanged(1,'updated-collection');

        expect(db.selectWhere).toHaveBeenCalledWith('collections','id',1);
        expect(answer).toBe(true);
    })
    it('should return false if db.selectWhere returned null', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await Collection.keyChanged(1,'updated-collection');

        expect(answer).toBe(false);
    })
    it('should log errors and return false', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await Collection.keyChanged(1,'updated-collection');

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(false);
    })
})