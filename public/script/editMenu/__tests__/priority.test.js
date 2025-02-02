import { priorityUp, priorityDown } from "../modules/priority";
import { entries } from "../modules/data";
import { updateVisualizationPriority } from "../modules/visualization";

jest.mock("../modules/visualization", () => ({
    updateVisualizationPriority: jest.fn(),
}));

describe("priorityUp", () => {
    beforeEach(() => {
        entries.length = 0;
        entries.push(
            { entryID: 1, priority: 2 },
            { entryID: 2, priority: 1 },
            { entryID: 3, priority: 3 }
        );

        updateVisualizationPriority.mockClear();
    });

    it("should increase priority", () => {
        priorityUp(1);
        expect(entries.find(entry => entry.entryID === 1).priority).toBe(1);
        expect(entries.find(entry => entry.entryID === 2).priority).toBe(2);
        expect(updateVisualizationPriority).toHaveBeenCalledTimes(2);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(1, 1);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(2, 2);

    });

    it("should do nothing if already highest priority", () => {
        priorityUp(2);
        expect(entries.find(entry => entry.entryID === 2).priority).toBe(1);
        expect(updateVisualizationPriority).not.toHaveBeenCalled();
    });

    it("should do nothing if entryID is not found", () => {
        priorityUp(4);
        expect(updateVisualizationPriority).not.toHaveBeenCalled();
    });
});

describe("priorityDown", () => {
    beforeEach(() => {
        entries.length = 0;
        entries.push(
            { entryID: 1, priority: 2 },
            { entryID: 2, priority: 1 },
            { entryID: 3, priority: 3 }
        );
        updateVisualizationPriority.mockClear();

    });

    it("should decrease priority", () => {
        priorityDown(1);
        expect(entries.find(entry => entry.entryID === 1).priority).toBe(3);
        expect(entries.find(entry => entry.entryID === 3).priority).toBe(2);
        expect(updateVisualizationPriority).toHaveBeenCalledTimes(2);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(1, 3);
        expect(updateVisualizationPriority).toHaveBeenCalledWith(3, 2);
    });

    it("should do nothing if already lowest priority", () => {
        priorityDown(3);
        expect(entries.find(entry => entry.entryID === 3).priority).toBe(3);
        expect(updateVisualizationPriority).not.toHaveBeenCalled();
    });

    it("should do nothing if entryID is not found", () => {
        priorityDown(4);
        expect(updateVisualizationPriority).not.toHaveBeenCalled();
    });
});