import { addBlockVisualization, deleteBlockVisualization, updateBlockVisualization, setLastVisualisation, updateVisualizationPriority, getOutputLabel } from '../modules/visualization';
import { setNextPriority, setCurrentBlock } from '../modules/data';
import DOM from '../modules/dom';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('deleteBlockVisualization', () => {
    it('should remove the entry visualization from the DOM', () => {
        const mockID = 1;

        const mockElement = document.createElement('div');
        mockElement.classList.add('block-vis-container');
        mockElement.dataset.instance = mockID;
        document.body.appendChild(mockElement);

        deleteBlockVisualization(mockID);

        const removedElement = document.querySelector(`.block-vis-container[data-instance="1"]`);
        expect(removedElement).toBeNull();
    });
});

describe('updateBlockVisualization', () => {
    it('should update the content of a visualization', () => {
        const mockID = 1;
        const mockData = {title: 'Mocked Block', output: {headline: 'test'}, priority: 2};

        const mockElement = document.createElement('div');
        mockElement.classList.add('block-vis-container');
        mockElement.dataset.instance = mockID;
        
        const blockTitle = document.createElement('h3');
        blockTitle.innerText = 'Old Title';
        mockElement.appendChild(blockTitle);

        const blockOutput = document.createElement('div');
        blockOutput.classList.add('output');
        mockElement.appendChild(blockOutput);

        document.body.appendChild(mockElement);

        updateBlockVisualization(mockID, mockData);

        expect(blockTitle.innerText).toBe(mockData.title);
        expect(blockOutput.innerHTML).toBe("<strong>headline</strong>: test<br>");
    });
});

describe('setLastVisualisation', () => {
    it('should add the last-vis class to the last visualization based on priority', () => {
        const mockLastVis = document.createElement('div');
        mockLastVis.classList.add('block-vis-container');
        mockLastVis.dataset.priority = '2';
        document.body.appendChild(mockLastVis);

        setNextPriority(3);
        setLastVisualisation();

        expect(mockLastVis.classList.contains('last-vis')).toBe(true);
    });
});

describe('getOutputLabel', () => {
    it('should return the correct label based on the input-name', () => {
        const mockInput = JSON.stringify([
            { params: { name: 'headline', label: 'Test Headline' } }
        ]);
        setCurrentBlock({ input: mockInput });

        const label = getOutputLabel('headline');

        expect(label).toBe('Test Headline');
    });

    it('should return an empty string if no label is found', () => {
        const mockInput = JSON.stringify([
            { params: { name: 'headline', label: 'Test Headline' } }
        ]);
        setCurrentBlock({ input: mockInput });

        const label = getOutputLabel('notexistinglabel');

        expect(label).toBe('');
    });
});


// describe('updateVisualizationPriority', () => {
//     it('should update the order style of the visualization', () => {
//         const mockID = 1;
//         const mockPriority = 3;

//         const mockElement = document.createElement('div');
//         mockElement.classList.add('block-vis-container');
//         mockElement.dataset.instance = mockID;
//         mockElement.dataset.priority = '1';
//         document.body.appendChild(mockElement);

//         updateVisualizationPriority(mockID, mockPriority);

//         expect(mockElement.dataset.priority).toBe(String(mockPriority));
//     });
// });

