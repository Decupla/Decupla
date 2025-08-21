import { getEntriesData, addEntry, removeEntry } from '../modules/entries';
import { getMenuById } from '../modules/api';
import { entries, setNextEntryId, setNextPriority, getEntryId, getPriority } from '../modules/data';
import { createEntryVisualization, deleteInputVisualization, updateVisualizationPriority } from '../modules/visualization';

jest.mock('../modules/api', () => ({
    getMenuById: jest.fn(),
}));

jest.mock('../modules/data', () => ({
    entries: [],
    setNextEntryId: jest.fn(),
    setNextPriority: jest.fn(),
    getEntryId: jest.fn(),
    getPriority: jest.fn(),
}));

jest.mock('../modules/visualization', () => ({
    createEntryVisualization: jest.fn(),
    deleteInputVisualization: jest.fn(),
    updateVisualizationPriority: jest.fn(),
}));

afterEach(() => {
    entries.length = 0;
    jest.clearAllMocks();
});

describe('getEntriesData', () => {
    it('should call getMenuById and retrieve entries from menu data', async () => {
        const mockMenuData = {
            success: true,
            menu: { entries: JSON.stringify([{ entryID: 1, title: 'Entry 1', priority: 1 }]) },
        };

        getMenuById.mockResolvedValue(mockMenuData);
        setNextEntryId.mockClear();
        setNextPriority.mockClear();

        await getEntriesData(1);

        expect(getMenuById).toHaveBeenCalledWith(1);
        expect(entries).toHaveLength(1);
        expect(entries[0].title).toBe('Entry 1');
        expect(setNextEntryId).toHaveBeenCalledWith(2);
        expect(setNextPriority).toHaveBeenCalledWith(2);
        expect(createEntryVisualization).toHaveBeenCalledWith(entries[0]);
    });

    it('should log errors if getMenuById failded', async () => {
        const mockMenuData = { success: false, message: 'Error message' };
        console.log = jest.fn();

        getMenuById.mockResolvedValue(mockMenuData);

        await getEntriesData(1);

        expect(console.log).toHaveBeenCalledWith('Error message');
    });

    it('should log errors if API call failed', async () => {
        console.error = jest.fn();
        getMenuById.mockRejectedValue(new Error('API Error'));

        await getEntriesData(1);

        expect(console.error).toHaveBeenCalledWith('Something went wrong:', expect.any(Error));
    });
});

describe('addEntry', () => {
    it('should add new entry to entries array and call createEntryVisualization', () => {
        const content = {
            querySelector: jest.fn(() => ({ innerText: 'New Entry' })),
            dataset: { id: '1' },
        };

        getEntryId.mockReturnValue(1);
        getPriority.mockReturnValue(1);

        addEntry(content);

        expect(entries).toHaveLength(1);
        expect(entries[0].entryID).toBe(1);
        expect(entries[0].title).toBe('New Entry');
        expect(entries[0].priority).toBe(1);
        expect(createEntryVisualization).toHaveBeenCalledWith(entries[0]);
    });
});

describe('removeEntry', () => {
    it('should remove an entry from entries array and update priorities', () => {
        entries.push({ entryID: 1, title: 'First Entry', priority: 1 });
        entries.push({ entryID: 2, title: 'Second Entry', priority: 2 });

        deleteInputVisualization.mockClear();
        updateVisualizationPriority.mockClear();
        setNextPriority.mockClear();

        removeEntry(1);

        expect(entries).toHaveLength(1);
        expect(entries[0].priority).toBe(1);
        expect(deleteInputVisualization).toHaveBeenCalledWith(1);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(2, 1);
        expect(setNextPriority).toHaveBeenCalledWith(2);
    });

    it('should not update anything if the entry could not be found', () => {
        entries.push({ entryID: 1, title: 'Entry 1', priority: 1 });

        deleteInputVisualization.mockClear();
        updateVisualizationPriority.mockClear();
        setNextPriority.mockClear();

        removeEntry(123);

        expect(deleteInputVisualization).not.toHaveBeenCalled();
        expect(updateVisualizationPriority).not.toHaveBeenCalled();
        expect(setNextPriority).not.toHaveBeenCalled();
    });
});
