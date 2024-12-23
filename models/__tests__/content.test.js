const Content = require('../content');
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
    insert: jest.fn(),
    updateWhere: jest.fn(),
    deleteWhere: jest.fn()
}));

describe('getAll',()=>{
    it('should get all content from database',async ()=>{
        const mockRows = [{ ID: 1, title: 'Test Content', status: 1 }];
        db.selectAll.mockResolvedValue(mockRows);

        const result = await Content.getAll();
        expect(result).toEqual(mockRows);
        expect(db.selectAll).toHaveBeenCalledWith('content');
    });
    it('should log errors',async ()=>{
        db.selectAll.mockRejectedValue(mockError);

        const result = await Content.getAll();

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    })
})

describe('get',()=>{
    it('should get a single row from database by id', async ()=> {
        const mockRow = { id: 1, title: 'Mock Content', status: 1 };
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await Content.get(1);

        expect(result).toEqual(mockRow);
        expect(db.selectWhere).toHaveBeenCalledWith('content','id',1)
    });
    it('should log errors',async ()=>{
        db.selectWhere.mockRejectedValue(mockError);
    
        const result = await Content.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    })
})

describe('add',()=>{
    it('should call db.insert and return new ID',async ()=>{
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);

        const data = { title: 'New mocked Content', status: 1 };
        const result = await Content.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('content',data);
    })
    it('should log errors',async ()=>{
        db.insert.mockRejectedValue(mockError);

        const data = { title: 'New Mock Content', status: 1};
        const result = await Content.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ',mockError);
    })
})

describe('update',()=>{
    it('should call the updateWhere function of the database',async ()=> {
        const data = { title: 'Updated Mock Content', status: 0 };
        const answer = await Content.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('content', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors',async ()=>{
        db.updateWhere.mockRejectedValue(mockError);

        const data = { title: 'Updated Mock Content', status: 0};
        const answer = await Content.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove',()=>{
    it('should call the deleteWhere function of the database',async ()=>{
        const answer = await Content.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('content', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors',async ()=>{
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await Content.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})