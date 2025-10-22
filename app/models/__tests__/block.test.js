const Block = require('../block');
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
    selectAllWhere: jest.fn(),
    insert: jest.fn(),
    updateWhere: jest.fn(),
    deleteWhere: jest.fn()
}));

describe('add', () => {
    it('should call db.insert and return new ID', async () => {
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);


        const data = { id: 1, title: 'New mocked block', key: 'mockedBlock', input: "", status: 1 };
        const result = await Block.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('blocks', data);
    })
    it('shoud log errors and return null', async () => {
        db.insert.mockRejectedValue(mockError);

        const data = { id: 1, title: 'New mocked block', input: "", status: 1 };
        const result = await Block.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ', mockError)
    })
})

describe('getAll', () => {
    it('should get all blocks from database', async () => {
        const mockRows = [{ id: 1, title: 'New mocked block', key: 'mockedBlock', input: "", tenantID: 1 }];
        db.selectAllWhere.mockResolvedValue(mockRows);

        const result = await Block.getAll(1);
        expect(result).toEqual(mockRows);
        expect(db.selectAllWhere).toHaveBeenCalledWith('blocks','tenantID',1);
    })
    it('should log errors', async () => {
        db.selectAllWhere.mockRejectedValue(mockError);

        const result = await Block.getAll(1);

        expect(result).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);

    })
})

describe('get', () => {
    it('should get a single row from database by id', async () => {
        const mockRow = { id: 1, title: 'New mocked block', key: 'mockedBlock', input: "", status: 1 };
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await Block.get(1);

        expect(result).toEqual(mockRow);
        expect(db.selectWhere).toHaveBeenCalledWith('blocks', 'id', 1)
    });
    it('should log errors', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const result = await Block.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
    })
})

describe('update', () => {
    it('should call the updateWhere function of the database', async () => {
        db.updateWhere.mockResolvedValue(true);

        const data = { id: 1, title: 'Updated mocked block', key: 'mockedBlock', input: "", status: 0 };
        const answer = await Block.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('blocks', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors', async () => {
        db.updateWhere.mockRejectedValue(mockError);

        const data = { id: 1, title: 'Updated mocked block', key: 'mockedBlock', input: "", status: 0 };
        const answer = await Block.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove', () => {
    it('should call the deleteWhere function of the database', async () => {
        db.deleteWhere.mockResolvedValue(true);

        const answer = await Block.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('blocks', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors', async () => {
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await Block.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('keyExists', () => {
    it('should call the selectWhere function of the database with correct parameters and return true if result is not null', async () => {
        const mockRow = { id: 1, title: 'New mocked block', key: 'mockedBlock', input: "", status: 1 };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Block.keyExists('mockedBlock');

        expect(db.selectWhere).toHaveBeenCalledWith('blocks', 'key', 'mockedBlock');
        expect(answer).toBe(true);
    })
    it('should return false if result is null', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await Block.keyExists('mockedBlock');

        expect(db.selectWhere).toHaveBeenCalledWith('blocks', 'key', 'mockedBlock');
        expect(answer).toBe(false);
    })
    it('should log errors and return false', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await Block.keyExists('mockedBlock');

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('keyChanged', () => {
    it('should call db.selectWhere and return false if result equals parameter', async () => {
        const mockRow = { id: 1, title: 'New mocked block', key: 'mockedBlock', input: "", status: 1 };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Block.keyChanged(1, 'mockedBlock');

        expect(db.selectWhere).toHaveBeenCalledWith('blocks', 'id', 1);
        expect(answer).toBe(false);
    })
    it('should call db.selectWhere and return true if result does not equal parameter', async () => {
        const mockRow = { id: 1, title: 'New mocked block', key: 'mockedBlock', input: "", status: 1 };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Block.keyChanged(1, 'mockedBlockNew');

        expect(db.selectWhere).toHaveBeenCalledWith('blocks', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should return false if db.selectWhere returned null', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await Block.keyChanged(1, 'mockedBlock');

        expect(answer).toBe(false);
    })
    it('should log errors and return false', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await Block.keyChanged(1, 'mockedBlock');

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('getKey', () => {
    it('should call db.selectWhere and return key of found row', async () => {
        const mockRow = { id: 1, title: 'New mocked block', key: 'mockedBlock', input: "", status: 1 };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Block.getKey(1);

        expect(db.selectWhere).toHaveBeenCalledWith('blocks', 'id', 1);
        expect(answer).toBe('mockedBlock');
    })
    it('should return null if no row was found', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await Block.getKey(1);

        expect(answer).toBe(null);

    })
    it('should log errors and return null', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await Block.getKey(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(null);
    })
})