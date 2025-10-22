const Menu = require('../menu');
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
    selectAllWhere: jest.fn(),
    selectWhere: jest.fn(),
    insert: jest.fn(),
    updateWhere: jest.fn(),
    deleteWhere: jest.fn()
}));

describe('add', () => {
    it('should call db.insert with correct parameters and return the new id', async () => {
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);

        const data = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' }
        const result = await Menu.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('menus', data);
    })
    it('should log errors and return null', async () => {
        db.insert.mockRejectedValue(mockError)

        const data = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' }
        const result = await Menu.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ', mockError);
    })
})

describe('getAll', () => {
    it('should call db.selectAllWhere and return the found rows', async () => {
        const mockedRows = [{ id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation', tenantID: 1 }];
        db.selectAllWhere.mockResolvedValue(mockedRows);

        const result = await Menu.getAll(1);

        expect(result).toEqual(mockedRows);
        expect(db.selectAllWhere).toHaveBeenCalledWith('menus','tenantID',1);
    })
    it('should log errors', async () => {
        db.selectAllWhere.mockRejectedValue(mockError)

        const result = await Menu.getAll(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError)
    })
})

describe('get', () => {
    it('should call db.selectWhere and return result', async () => {
        const mockedRow = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' };
        db.selectWhere.mockResolvedValue(mockedRow);

        const result = await Menu.get(1);

        expect(result).toEqual(mockedRow);
        expect(db.selectWhere).toHaveBeenCalledWith('menus', 'id', 1);
    })
    it('should log errors and return null', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const result = await Menu.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError)
    })
})

describe('getByKey', () => {
    it('should call db.selectWhere and return result', async () => {
        const mockedRow = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' };
        db.selectWhere.mockResolvedValue(mockedRow);

        const result = await Menu.getByKey('main-navigation');

        expect(result).toEqual(mockedRow);
        expect(db.selectWhere).toHaveBeenCalledWith('menus', 'key', 'main-navigation');
    })
    it('should log errors and return null', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const result = await Menu.getByKey('main-navigation');

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError)
    })
})

describe('update', () => {
    it('should call db.updateWhere and return true on success', async () => {
        db.updateWhere.mockResolvedValue(true);

        const data = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' }
        const answer = await Menu.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('menus', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('shoud log errors and return false', async () => {
        db.updateWhere.mockRejectedValue(mockError);

        const data = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' }
        const answer = await Menu.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove', () => {
    it('should call db.deleteWhere and return true on success', async () => {
        db.deleteWhere.mockResolvedValue(true);

        const answer = await Menu.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('menus', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors and return false', async () => {
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await Menu.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('keyExists', () => {
    it('should call the selectWhere function of the database with correct parameters and return true if result is not null', async () => {
        const mockRow = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' }
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Menu.keyExists('main-navigation');

        expect(db.selectWhere).toHaveBeenCalledWith('menus','key','main-navigation');
        expect(answer).toBe(true);
    })
    it('should return false if result is null', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await Menu.keyExists('main-navigation');

        expect(db.selectWhere).toHaveBeenCalledWith('menus','key','main-navigation');
        expect(answer).toBe(false);
    })
    it('should log errors and return false', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await Menu.keyExists('main-navigation');

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('keyChanged', () => {
    it('should call db.selectWhere and return false if result equals parameter', async () => {
        const mockRow = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Menu.keyChanged(1,'main-navigation');

        expect(db.selectWhere).toHaveBeenCalledWith('menus','id',1);
        expect(answer).toBe(false);
    })
    it('should call db.selectWhere and return true if result does not equal parameter', async () => {
        const mockRow = { id: 1, title: 'Main Navigation', entries: '[1,3,3]', key: 'main-navigation' };
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await Menu.keyChanged(1,'main-navigation-new');

        expect(db.selectWhere).toHaveBeenCalledWith('menus','id',1);
        expect(answer).toBe(true);
    })
    it('should return false if db.selectWhere returned null', async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await Menu.keyChanged(1,'main-navigation-new');

        expect(answer).toBe(false);
    })
    it('should log errors and return false', async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await Menu.keyChanged(1,'main-navigation-new');

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ', mockError);
        expect(answer).toBe(false);
    })
})