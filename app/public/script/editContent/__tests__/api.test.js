import { fetchContentBlocks, saveContentData, saveBlockData, deleteBlockInstance, fetchBlock, fetchMedia } from '../modules/api';

global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('fetchContentBlocks', () => {
    it('should call fetch and return JSON', async () => {
        const mockResponse = {
            success: true,
            blocks: [
                {
                    id: 1,
                    blockID: 2,
                    contentID: 1,
                    output: JSON.parse('{"text":"<p>Hallo Welt</p>"}'),
                    priority: 1,
                    title: "Textabschnitt"
                }
            ]
        };

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await fetchContentBlocks(1);

        expect(fetch).toHaveBeenCalledWith(`/content/1/blocks`);
        expect(result).toEqual(mockResponse);
    })
})

describe('saveContentData', () => {
    it('should call fetch with correct parameters and return response as JSON', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const url = '/content/';
        const method = 'POST';
        const data = { title: 'Test Content', status: 1, description: '' };

        const result = await saveContentData(url, method, data);


        expect(fetch).toHaveBeenCalledWith(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        expect(result).toEqual(mockResponse);
    })
})

describe('saveBlockData', () => {
    it('should call fetch with correct parameters and return response as JSON', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const url = '/blocks/instances/';
        const method = 'POST';
        const data = { id: 1, blockID: 2, contentID: 1, output: JSON.parse('{"text":"<p>Hallo Welt</p>"}'), priority: 1, title: "Textabschnitt" };

        const result = await saveBlockData(url, method, data);

        expect(fetch).toHaveBeenCalledWith(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        expect(result).toEqual(mockResponse);
    })
})

describe('deleteBlockInstance', () => {
    it('should call fetch with correct parameters and return response as JSON', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await deleteBlockInstance(1);

        expect(fetch).toHaveBeenCalledWith(`/blocks/instances/1`, { method: 'DELETE' });
        expect(result).toEqual(mockResponse);
    })
})

describe('fetchBlock', () => {
    it('should call fetch return JSON', async () => {
        const mockResponse = {
            success: true,
            blocks: {
                id: 1,
                blockID: 2,
                contentID: 1,
                output: JSON.parse('{"text":"<p>Hallo Welt</p>"}'),
                priority: 1,
                title: "Textabschnitt"
            }
        };

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await fetchBlock(1);

        expect(fetch).toHaveBeenCalledWith(`/blocks/1`);
        expect(result).toEqual(mockResponse);
    });
})

describe('fetchMedia', () => {
    it('should call fetch return JSON', async () => {
        const mockResponse = [{ id: 1, file: "test.png", alt: "", type: "image/jpeg", size: 1234 }];

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await fetchMedia(1);

        expect(fetch).toHaveBeenCalledWith('/media/all');
        expect(result).toEqual(mockResponse);
    });
})