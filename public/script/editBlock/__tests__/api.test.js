import { getBlockById, getBlockByKey, saveBlock } from "../modules/api";

global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('getBlockById', () => {
    it('should call fetch and return JSON', async () => {
        const mockResponse = {
            success: true,
            block: {
                id: 2,
                key: "text",
                title: "Textabschnitt",
                input: [
                    {
                        id: 1,
                        priority: 1,
                        params: {
                            type: "longText",
                            name: "text",
                            label: "Text"
                        }
                    }
                ],
                created: 123456789,
                updated: null
            }
        };

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await getBlockById(1);

        expect(fetch).toHaveBeenCalledWith(`/blocks/1`);
        expect(result).toEqual(mockResponse);
    })

})

describe('getBlockByKey', () => {
    it('should call fetch and return JSON', async () => {
        const mockResponse = {
            success: true,
            block: {
                id: 2,
                key: "text",
                title: "Textabschnitt",
                input: [
                    {
                        id: 1,
                        priority: 1,
                        params: {
                            type: "longText",
                            name: "text",
                            label: "Text"
                        }
                    }
                ],
                created: 123456789,
                updated: null
            }
        };

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await getBlockByKey('text');

        expect(fetch).toHaveBeenCalledWith(`/blocks/key/text`);
        expect(result).toEqual(mockResponse);
    })
})

describe('saveBlock', () => {
    it('should call fetch with correct parameters and return response as json', async () => {
        const mockResponse = { success: true };
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const url = '/blocks/';
        const method = 'POST';
        const data = { key: "text", title: "Textabschnitt", input: [{ id: 1, priority: 1, params: { type: "longText", name: "text", label: "Text" } }] };

        const result = await saveBlock(url, method, data);

        expect(fetch).toHaveBeenCalledWith(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        expect(result).toEqual(mockResponse);
    })
})