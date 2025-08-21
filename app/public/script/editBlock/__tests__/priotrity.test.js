import { priorityUp, priorityDown } from "../modules/priority";
import { inputData } from "../modules/data";
import { updateVisualizationPriority, setLastVisualisation } from "../modules/visualization";

jest.mock("../modules/data", () => ({
    inputData: []
}))

jest.mock("../modules/visualization", () => ({
    updateVisualizationPriority: jest.fn(),
    setLastVisualisation: jest.fn()
}))

afterEach(()=>{
    jest.clearAllMocks();
})

describe('priorityUp', () => {
    beforeEach(() => {
        inputData.length = 0;
        inputData.push(
            { id: 1, priority: 2 },
            { id: 2, priority: 1 },
            { id: 3, priority: 3 }
        );
    });

    it("should increase priority", () => {
        priorityUp(1);

        expect(inputData.find(input => input.id === 1).priority).toBe(1);
        expect(inputData.find(input => input.id === 2).priority).toBe(2);
        expect(updateVisualizationPriority).toHaveBeenCalledTimes(2);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(1, 1);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(2, 2);
        expect(setLastVisualisation).toHaveBeenCalled();
    })

    it("should do nothing if already highest priority", () => {
        priorityUp(2);

        expect(inputData.find(input => input.id === 1).priority).toBe(2);
        expect(inputData.find(input => input.id === 2).priority).toBe(1);
        expect(updateVisualizationPriority).not.toHaveBeenCalled();
        expect(setLastVisualisation).not.toHaveBeenCalled();
    })
})

describe("priorityDown", () => {
    beforeEach(() => {
        inputData.length = 0;
        inputData.push(
            { id: 1, priority: 2 },
            { id: 2, priority: 1 },
            { id: 3, priority: 3 }
        );
    });

    it("should decrease priority", () => {
        priorityDown(1);
        expect(inputData.find(input => input.id === 1).priority).toBe(3);
        expect(inputData.find(input => input.id === 3).priority).toBe(2);
        expect(updateVisualizationPriority).toHaveBeenCalledTimes(2);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(1, 3);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(3, 2);
        expect(setLastVisualisation).toHaveBeenCalled();
    });

    it("should do nothing if already lowest priority", () => {
        priorityDown(3);
        expect(inputData.find(input => input.id === 3).priority).toBe(3);
        expect(updateVisualizationPriority).not.toHaveBeenCalled();
        expect(setLastVisualisation).not.toHaveBeenCalled();
    });
});