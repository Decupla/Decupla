import { saveMenu, getMenuById } from '../modules/api';

global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('saveMenu', () => {
    it('should call fetch with correct parameters and return JSON', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const url = '/menus';
        const method = 'POST';
        const data = { name: 'Test Menu' };

        const result = await saveMenu(url, method, data);

        expect(fetch).toHaveBeenCalledWith(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        expect(result).toEqual(mockResponse);
    });
});

describe('getMenuById', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call fetch and return JSON ', async () => {
        const mockResponse = { id: 123, name: 'Test Menu' };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await getMenuById(1);

        expect(fetch).toHaveBeenCalledWith(`/menus/1`);
        expect(result).toEqual(mockResponse);
    });

});
