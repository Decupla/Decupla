const Menu = require('../menu');
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
    insert: jest.fn()
}));

describe('add',()=>{
    it('should call db.insert with correct parameters and return the new id',async ()=>{
        const mockNewId = 1;
        db.insert.mockResolvedValue(mockNewId);

        const data = {id: 1, title: 'Main Navigation', entries: '[1,3,3]'}
        const result = await Menu.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('menus',data);
    })
    it('should log errors and return null',async () => {
        db.insert.mockRejectedValue(mockError)

        const data = {id: 1, title: 'Main Navigation', entries: '[1,3,3]'}
        const result = await Menu.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ',mockError);
    })
})

describe('getAll',()=>{
    it('should call db.selectAll and return the found rows',async ()=>{
        const mockedRows = [{id: 1, title: 'Main Navigation', entries: '[1,3,3]'}];
        db.selectAll.mockResolvedValue(mockedRows);

        const result = await Menu.getAll();

        expect(result).toEqual(mockedRows);
        expect(db.selectAll).toHaveBeenCalledWith('menus');
    })
    it('should log errors',async () => {
        db.selectAll.mockRejectedValue(mockError)

        const result = await Menu.getAll();

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError)
    })
})