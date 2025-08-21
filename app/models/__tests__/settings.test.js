const Setting = require('../setting');
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
    selectWhere: jest.fn(),
    updateWhere: jest.fn(),
}));

describe('update', () => {
    it('should call db.updateWhere with correct parameters and return true', async () => {
        db.updateWhere.mockResolvedValue(true);

        const data = { key: 'updatedSetting', value: "updatedValue" };
        const answer = await Setting.update(data);

        expect(db.updateWhere).toHaveBeenCalledWith('settings', data, 'key', 'updatedSetting');
        expect(answer).toBe(true);
    })
    it('should log errors and return false', async () => {
        db.updateWhere.mockRejectedValue(mockError);

        const data = { key: 'updatedSetting', value: "updatedValue" };
        const answer = await Setting.update(data);

        expect(consoleSpy).toHaveBeenCalledWith('Error updating data: ', mockError)
        expect(answer).toBe(false);
    })
})

describe('get', () => {
    it('should call db.selectWhere with correct parameters and return value of found row', async () => {
        const mockRow = {id: 1, key: 'mockedSetting', value: 'mockedValue'};
        db.selectWhere.mockResolvedValue(mockRow);

        const result = await Setting.get('mockedSetting');

        expect(result).toEqual('mockedValue');
        expect(db.selectWhere).toHaveBeenCalledWith('settings','key','mockedSetting');
    })
    it('should log errors and return null',async ()=>{
        db.selectWhere.mockRejectedValue(mockError);
        
        const result = await Setting.get('mockedSetting');

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving data: ',mockError);
    })
})