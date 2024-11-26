const {getAll, add} = require('./content');
const db = require('../database');

jest.mock('../database', () => ({
    selectAll: jest.fn(),
    insert: jest.fn(),
}));

describe('getAll',()=>{
    it('should get all content from database',async ()=>{
        const mockRows = [{ ID: 1, title: 'Test Content', status: 1 }];
        db.selectAll.mockResolvedValue(mockRows);

        const result = await getAll();
        expect(result).toEqual(mockRows);
        expect(db.selectAll).toHaveBeenCalledWith('content');
    })
})

describe('add',()=>{
    it('should call db.insert',()=>{
        return;
    })
})