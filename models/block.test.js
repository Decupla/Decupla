const Block = require('./block');
const db = require('../database/database');

let consoleSpy;

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
});


jest.mock('../database/database', () => ({
    selectAll: jest.fn(),
    selectWhere: jest.fn(),
    insert: jest.fn(),
    updateWhere: jest.fn(),
    deleteWhere: jest.fn()
}));

describe('add',()=>{
    it('should call db.insert and return new ID',async()=>{
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);


        const data = { id: 1, title: 'New mocked block', input: "", status: 1 };
        const result = await Block.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('blocks',data);
    })
    it('shoud log errors and return null',async()=>{
        const mockError = new Error('Database Mock Error');
        db.insert.mockRejectedValue(mockError);

        const data = { id: 1, title: 'New mocked block', input: "", status: 1 };
        const result = await Block.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ',mockError)
    })
})

describe('getAll',()=>{
    it('should get all blocks from database',async ()=>{
        const mockRows = [{ id: 1, title: 'New mocked block', input: "", status: 1 }];
        db.selectAll.mockResolvedValue(mockRows);

        const result = await Block.getAll();
        expect(result).toEqual(mockRows);
        expect(db.selectAll).toHaveBeenCalledWith('blocks');
    })
    it('should log errors',async ()=>{
        const mockError = new Error('Database Mock Error');
        db.selectAll.mockRejectedValue(mockError);

        const result = await Block.getAll();

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);

    })
})

describe('get',()=>{
    it('should get a single row from database by id', async ()=> {
        const mockRow = { id: 1, title: 'New mocked block', input: "", status: 1 };
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await Block.get(1);

        expect(result).toEqual(mockRow);
        expect(db.selectWhere).toHaveBeenCalledWith('blocks','id',1)
    });
    it('should log errors',async ()=>{
        const mockError = new Error('Database Mock Error');
        db.selectWhere.mockRejectedValue(mockError);
        
        const result = await Block.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    })
})

describe('update',()=>{
    it('should call the updateWhere function of the database',async ()=> {
        db.updateWhere.mockResolvedValue(true);

        const data = { id: 1, title: 'Updated mocked block', input: "", status: 0 };
        const answer = await Block.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('blocks', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors',async ()=>{
        const mockError = new Error('Database Mock Error');
        db.updateWhere.mockRejectedValue(mockError);

        const data = { id: 1, title: 'Updated mocked block', input: "", status: 0 };
        const answer = await Block.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove',()=>{
    it('should call the deleteWhere function of the database',async ()=>{
        db.updateWhere.mockResolvedValue(true);

        const answer = await Block.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('blocks', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors',async ()=>{
        const mockError = new Error('Database Mock Error');
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await Block.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})