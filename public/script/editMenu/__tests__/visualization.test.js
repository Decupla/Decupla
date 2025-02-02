import { createEntryVisualization, deleteInputVisualization, updateVisualizationPriority } from '../modules/visualization';
import DOM from '../modules/dom';

jest.mock('../modules/entries', () => ({
    removeEntry: jest.fn(),
}));

jest.mock('../modules/priority', () => ({
    priorityUp: jest.fn(),
    priorityDown: jest.fn(),
}));

jest.mock('../modules/dom', () => ({
    entriesArea: {
        appendChild: jest.fn(),
    },
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('createEntryVisualization', () => {
    it('should create a new entry visualization', () => {
        const mockData = {
            entryID: 1,
            title: 'Test Entry',
            priority: 1,
        };
    
        createEntryVisualization(mockData);
    
        expect(DOM.entriesArea.appendChild).toHaveBeenCalled();
    });    
});

describe('deleteInputVisualization', () => {
    it('should remove the entry visualization from the DOM', () => {
        const mockID = 1;

        const mockElement = document.createElement('div');
        mockElement.classList.add('entryVis');
        mockElement.dataset.id = mockID;
        document.body.appendChild(mockElement);

        deleteInputVisualization(mockID);

        const removedElement = document.querySelector(`.entryVis[data-id="${mockID}"]`);
        expect(removedElement).toBeNull();
    });
});

describe('updateVisualizationPriority', () => {
    it('should update the order style of the visualization', () => {
        const mockID = 1;
        const newPriority = 2;

        const mockElement = document.createElement('div');
        mockElement.classList.add('entryVis');
        mockElement.dataset.id = mockID;
        document.body.appendChild(mockElement);

        updateVisualizationPriority(mockID, newPriority);

        expect(mockElement.style.order).toBe(String(newPriority));
    });
});
