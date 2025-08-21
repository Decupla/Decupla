const BlockInstance = require('../blockInstance');
const db = require('../../database/database');

const mockError = new Error('Database Mock Error');
let consoleSpy;

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
    deleteWhere: jest.fn(),
    deleteAllWhere: jest.fn()
}));

describe('add',()=>{
    it('should call db.insert and return new ID',async () =>{
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);

        const data = {id: 1, blockID: 3, contentID: 8, output: ''};
        const result = await BlockInstance.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('block_instances',data);
    })
    it('should log errors and return null',async () => {
        db.insert.mockRejectedValue(mockError);

        const data = {id: 1, blockID: 3, contentID: 8, output: ''};
        const result = await BlockInstance.add(data);

        expect(result).toBe(null);
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ',mockError);
    })
})

describe('getByContent',()=>{
    it('should call db.selectAllWhere with correct parameters and return the result',async()=>{
        const mockedRows = [{id: 1, blockID: 3, contentID: 8, output: '', priority: 1},{id: 2, blockID: 3, contentID: 8, output: '', priority: 2}];
        db.selectAllWhere.mockResolvedValue(mockedRows);

        const result = await BlockInstance.getByContent(8);

        expect(result).toEqual(mockedRows);
        expect(db.selectAllWhere).toHaveBeenCalledWith('block_instances','contentID', 8, 'priority', 'ASC');
    })
    it('should log errors and return null',async () => {
        db.selectAllWhere.mockRejectedValue(mockError);

        const result = await BlockInstance.getByContent(8);

        expect(result).toBe(null);
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    })
})

describe('update',()=>{
    it('should call db.updateWhere with correct parameters and return true on success',async()=>{
        db.updateWhere.mockResolvedValue(true);

        const data = {id: 1, blockID: 3, contentID: 8, output: ''};
        const result = await BlockInstance.update(1,data);

        expect(result).toBe(true);
        expect(db.updateWhere).toHaveBeenCalledWith('block_instances',data,'id',1);
    })
    it('should log errors and return false',async()=>{
        db.updateWhere.mockRejectedValue(mockError);

        const data = {id: 1, blockID: 3, contentID: 8, output: ''};
        const result = await BlockInstance.update(1,data);

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ',mockError);
    })
})

describe('delete',()=>{
    it('should call db.deleteWhere with correct parameters and return true on success',async()=>{
        db.deleteWhere.mockResolvedValue(true);

        const result = await BlockInstance.remove(1);

        expect(result).toBe(true);
        expect(db.deleteWhere).toHaveBeenCalledWith('block_instances','id',1);
    })
    it('should log errors and return false',async()=>{
        db.deleteWhere.mockRejectedValue(mockError);

        const result = await BlockInstance.remove(1);

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ',mockError);
    })
})

describe('deleteByContent',()=>{
    it('should call db.deleteAllWhere with correct parameters and return true on success',async()=>{
        db.deleteAllWhere.mockResolvedValue(true);

        const result = await BlockInstance.deleteByContent(1);

        expect(result).toBe(true);
        expect(db.deleteAllWhere).toHaveBeenCalledWith('block_instances','contentID',1);
    })
    it('should log errors and return false',async () => {
        db.deleteAllWhere.mockRejectedValue(mockError);

        const result = await BlockInstance.deleteByContent(1);

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ',mockError);
    })
})

describe('delteByBlock',()=>{
    it('should call db.deleteAllWhere with correct parameters and return true on success',async()=>{
        db.deleteAllWhere.mockResolvedValue(true);

        const result = await BlockInstance.deleteByBlock(1);

        expect(result).toBe(true);
        expect(db.deleteAllWhere).toHaveBeenCalledWith('block_instances','blockID',1);
    })
    it('should log errors and return false',async () => {
        db.deleteAllWhere.mockRejectedValue(mockError);

        const result = await BlockInstance.deleteByBlock(1);

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ',mockError);
    })
})