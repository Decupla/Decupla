import { priorityUp, priorityDown, updateBlocksPriority } from '../modules/priority';
import { blocksData, setNextPriority } from '../modules/data';
import { setLastVisualisation, updateVisualizationPriority } from '../modules/visualization';

jest.mock('../modules/data', () => ({
    setNextPriority: jest.fn(),
    blocksData: []
}));

jest.mock('../modules/visualization', () => ({
    setLastVisualisation: jest.fn(),
    updateVisualizationPriority: jest.fn()
}));

describe('priorityUp', () => {
    beforeEach(()=>{
        blocksData.length = 0
        blocksData.push(
            { instanceID: 1, priority: 1 },
            { instanceID: 2, priority: 2 },
            { instanceID: 3, priority: 3 }
        );
    })


    it('should decrease priority of the block and increase priority of the previous block', () => {
        const instanceID = 2;

        const block = blocksData.find(block => block.instanceID === instanceID);
        const prevBlock = blocksData.find(block => block.priority === 1);

        priorityUp(instanceID);

        expect(block.priority).toBe(1);
        expect(prevBlock.priority).toBe(2);

        expect(updateVisualizationPriority).toHaveBeenCalledWith(instanceID, 1);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(prevBlock.instanceID, 2);
        expect(setLastVisualisation).toHaveBeenCalled();
    });
});

describe('priorityDown', () => {
    beforeEach(()=>{
        blocksData.length = 0
        blocksData.push(
            { instanceID: 1, priority: 1 },
            { instanceID: 2, priority: 2 },
            { instanceID: 3, priority: 3 }
        );
    })

    it('should increase priority of the block and decrease priority of the next block', () => {
        const instanceID = 2;

        const block = blocksData.find(block => block.instanceID === instanceID);
        const nextBlock = blocksData.find(block => block.priority === 3);

        priorityDown(instanceID);

        expect(block.priority).toBe(3);
        expect(nextBlock.priority).toBe(2);

        expect(updateVisualizationPriority).toHaveBeenCalledWith(instanceID, 3);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(nextBlock.instanceID, 2);
        expect(setLastVisualisation).toHaveBeenCalled();
    });
});

// describe('updateBlocksPriority', () => {
//     beforeEach(() => {
//         blocksData.length = 0;
//         blocksData.push(
//             { instanceID: 1, priority: 1 },
//             { instanceID: 2, priority: 2 },
//             { instanceID: 3, priority: 3 }
//         );
//     });

//     it('should update the priority of blocks correctly', () => {

//         updateBlocksPriority(2,3);

//         expect(blocksData[0].priority).toBe(1);
//         expect(blocksData[1].priority).toBe(2);
//         expect(blocksData[2].priority).toBe(2);

//         expect(setNextPriority).toHaveBeenCalledWith(3);
//     });

//     it('should not modify blocks if no block priority is greater than the changedPriority', () => {
//         const changedPriority = 3;

//         updateBlocksPriority(changedPriority);

//         expect(blocksData[0].priority).toBe(1);
//         expect(blocksData[1].priority).toBe(2);
//         expect(blocksData[2].priority).toBe(3);

//         expect(setNextPriority).toHaveBeenCalled();
//     });
// });

