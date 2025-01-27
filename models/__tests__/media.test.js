const Media = require('../media');
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


        const data = { file: 'mockedFile.png', alt: 'mockedAlt', type: 'image/png', size: '123' };
        const result = await Media.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('media', data);
    });
    it('shoud log errors and return null', async () => {
        db.insert.mockRejectedValue(mockError);

        const data = { file: 'mockedFile.png', alt: 'mockedAlt', type: 'image/png', size: '123' };
        const result = await Media.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ', mockError)
    });
})

describe('get', () => {
    it('should call db.selectWhere with correct parameters and return found row', async ()=> {
        const mockRow = { id: 1, file: 'mockedFile.png', alt: 'mockedAlt', type: 'image/png', size: '123' };
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await Media.get(1);

        expect(result).toEqual(mockRow);
        expect(db.selectWhere).toHaveBeenCalledWith('media','id',1)
    });
    it('should log errors and return null',async ()=>{
        db.selectWhere.mockRejectedValue(mockError);
        
        const result = await Media.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    });
})

describe('getAll', () => {
    it('should call db.selectAll and return found rows',async ()=>{
        const mockRows = [{ id: 1, file: 'mockedFile.png', alt: 'mockedAlt', type: 'image/png', size: '123' }];
        db.selectAll.mockResolvedValue(mockRows);

        const result = await Media.getAll();
        expect(result).toEqual(mockRows);
        expect(db.selectAll).toHaveBeenCalledWith('media');
    });
    it('should log errors',async ()=>{
        db.selectAll.mockRejectedValue(mockError);

        const result = await Media.getAll();

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);

    })
})

describe('update', () => {
    it('should call db.updateWhere with correct parameters and return true',async ()=> {
        db.updateWhere.mockResolvedValue(true);

        const data = { file: 'updatedFile.png', alt: 'updatedAlt', type: 'image/png', size: '123' };
        const answer = await Media.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('media', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors and return false',async ()=>{
        db.updateWhere.mockRejectedValue(mockError);

        const data = { file: 'updatedFile.png', alt: 'updatedAlt', type: 'image/png', size: '123' };
        const answer = await Media.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove', () => {
    it('should call db.deleteWhere with correct parameters and return true',async ()=>{
        db.deleteWhere.mockResolvedValue(true);

        const answer = await Media.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('media', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors',async ()=>{
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await Media.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})