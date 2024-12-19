const User = require('./user');
const db = require('../database/database');

const mockError = new Error('Database Mock Error');
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


        const data = { email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1};
        const result = await User.add(data);

        expect(result).toBe(mockNewId);
        expect(db.insert).toHaveBeenCalledWith('users',data);
    })
    it('shoud log errors and return null',async()=>{
        db.insert.mockRejectedValue(mockError);

        const data = { email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1};
        const result = await User.add(data);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error inserting data: ',mockError)
    })
});

describe('getAll',()=>{
    it('should call db.selectAll and return found rows',async ()=>{
        const mockRows = [{ id: 1, email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1}];
        db.selectAll.mockResolvedValue(mockRows);

        const result = await User.getAll();
        expect(result).toEqual(mockRows);
        expect(db.selectAll).toHaveBeenCalledWith('users');
    })
    it('should log errors',async ()=>{
        db.selectAll.mockRejectedValue(mockError);

        const result = await User.getAll();

        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);

    })
});

describe('get',()=>{
    it('should call db.selectWhere with correct parameters and return found row', async ()=> {
        const mockRow = { id: 1, email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1};
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await User.get(1);

        expect(result).toEqual(mockRow);
        expect(db.selectWhere).toHaveBeenCalledWith('users','id',1)
    });
    it('should log errors and return null',async ()=>{
        db.selectWhere.mockRejectedValue(mockError);
        
        const result = await User.get(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    })
})

describe('getByMail',()=>{
    it('should call db.selectWhere with correct parameters and return found row', async ()=> {
        const mockRow = { id: 1, email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword", role: 1};
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await User.getByMail('nils@gmail.com');

        expect(result).toEqual(mockRow);
        expect(db.selectWhere).toHaveBeenCalledWith('users','email','nils@gmail.com')
    });
    it('should log errors and return null',async ()=>{
        db.selectWhere.mockRejectedValue(mockError);
        
        const result = await User.getByMail('nils@gmail.com');

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    })
})

describe('update',()=>{
    it('should call db.updateWhere with correct parameters and return true',async ()=> {
        db.updateWhere.mockResolvedValue(true);

        const data = { email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword", role: 1};
        const answer = await User.update(1, data);

        expect(db.updateWhere).toHaveBeenCalledWith('users', data, 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors and return false',async ()=>{
        db.updateWhere.mockRejectedValue(mockError);

        const data = { email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword", role: 1};
        const answer = await User.update(1, data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('remove',()=>{
    it('should call db.deleteWhere with correct parameters and return true',async ()=>{
        db.deleteWhere.mockResolvedValue(true);

        const answer = await User.remove(1);
        expect(db.deleteWhere).toHaveBeenCalledWith('users', 'id', 1);
        expect(answer).toBe(true);
    })
    it('should log errors',async ()=>{
        db.deleteWhere.mockRejectedValue(mockError);

        const answer = await User.remove(1);

        expect(consoleSpy).toHaveBeenCalledWith('Error deleting data: ', mockError);
        expect(answer).toBe(false);
    })
})

describe('emailChanged',()=>{
    it('should call db.selectWhere with correct parameters and return false if email is equal',async () => {
        const mockRow = { id: 1, email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1};
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await User.emailChanged(1,'nils@gmail.com');

        expect(answer).toBe(false);

        expect(db.selectWhere).toHaveBeenCalledWith('users','id',1);
    })    
    it('should call db.selectWhere with correct parameters and return true if email is not equal',async () => { 
        const mockRow = { id: 1, email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1};
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await User.emailChanged(1,'nil2s@gmail.com');

        expect(answer).toBe(true);
        expect(db.selectWhere).toHaveBeenCalledWith('users','id',1);
    })    
    it('should return false if no user was found',async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await User.emailChanged(1,'nil2@gmail.com');

        expect(answer).toBe(false);
        expect(db.selectWhere).toHaveBeenCalledWith('users','id',1);
    })
    it('should log errors and return false',async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await User.emailChanged(1,'nils@gmail.com');

        expect(answer).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Error while checking name email: ',mockError);
    })
})

describe('mailExists',()=>{
    it('should call db.selectWhere and return true if row was found',async () => {
        const mockRow = { id: 1, email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1};
        db.selectWhere.mockResolvedValue(mockRow);

        const answer = await User.mailExists('nils@gmail.com');

        expect(answer).toBe(true);
        expect(db.selectWhere).toHaveBeenCalledWith('users','email','nils@gmail.com');
    })
    it('should call db.selectWhere and return false if no row was found',async () => {
        db.selectWhere.mockResolvedValue(null);

        const answer = await User.mailExists('nils@gmail.com');

        expect(answer).toBe(false);
        expect(db.selectWhere).toHaveBeenCalledWith('users','email','nils@gmail.com');
    })
    it('should log errors and return false',async () => {
        db.selectWhere.mockRejectedValue(mockError);

        const answer = await User.mailExists('nils@gmail.com');

        expect(answer).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Error while checking for email: ',mockError);
    })
})