import { handleTypeChange, handleInputSubmit, handleBlockSubmit } from "../modules/eventHandler";
import { setVisible, saveNewInput, updateInput } from "../modules/input";
import { resetMessages, setFieldMessage } from "../modules/validation";
import { setSubmittedForm } from "../modules/data";
import { saveBlock } from "../modules/api";
import DOM from "../modules/dom";

jest.mock("../modules/input", () => ({
    setVisible: jest.fn(),
    saveNewInput: jest.fn(),
    updateInput: jest.fn()
}));

jest.mock("../modules/validation", () => ({
    resetMessages: jest.fn(),
    setFieldMessage: jest.fn()
}));

jest.mock("../modules/data", () => ({
    setSubmittedForm: jest.fn(),
    inputMethod: "create",
    blockExists: false,
    setBlockExists: jest.fn(),
    setBlockID: jest.fn(),
    blockID: null,
    inputData: {}
}));

jest.mock("../modules/api", () => ({
    saveBlock: jest.fn()
}));

jest.mock("../modules/dom", () => ({
    titleInput: { value: "Test Title" },
    keyInput: { value: "Test Key" },
    messageSuccess: { classList: { add: jest.fn() } }
}));

describe("handleTypeChange", () => {
    it("should call setVisible for correct fields", () => {
        handleTypeChange("shortText", "element");
        expect(setVisible).toHaveBeenCalledWith(["name", "label", "type", "maxLength"], "element");
    });
});

describe("handleInputSubmit", () => {
    let form;

    beforeEach(() => {
        form = document.createElement("form");
        form.innerHTML = `
            <input name="type" value="shortText">
            <input name="name" value="testName">
            <input name="label" value="Test Label">
            <input name="maxLength" value="100">
        `;
    });

    it("should call resetMessages and setSubmittedForm", () => {
        const mockEvent = { preventDefault: jest.fn(), target: form };
        handleInputSubmit(mockEvent, 1);
        expect(resetMessages).toHaveBeenCalled();
        expect(setSubmittedForm).toHaveBeenCalledWith(form);
    });

    it("should call saveNewInput if inputMethod is 'create'", () => {
        const mockEvent = { preventDefault: jest.fn(), target: form };
        handleInputSubmit(mockEvent, 1);
        expect(saveNewInput).toHaveBeenCalledWith(
            { type: "shortText", name: "testName", label: "Test Label", maxLength: "100" },
            1
        );
    });

    // it("should call updateInput if inputMethod is 'update'", () => {
    //     jest.mock("../modules/data", () => ({
    //         ...jest.requireActual("../modules/data"),
    //         inputMethod: "update"
    //     }));

    //     const mockEvent = { preventDefault: jest.fn(), target: form };
    //     handleInputSubmit(mockEvent, 1);
    //     expect(updateInput).toHaveBeenCalledWith({
    //         type: "shortText",
    //         name: "testName",
    //         label: "Test Label",
    //         maxLength: "100"
    //     });
    // });
});

describe("handleBlockSubmit", () => {
    let form;

    beforeEach(() => {
        form = document.createElement("form");
        form.innerHTML = `
            <input name="title" value="Block Title">
            <input name="key" value="Block Key">
        `;
    });

    it("should call resetMessages and saveBlock with correct data", async () => {
        saveBlock.mockResolvedValue({ success: true, validation: true, newID: 123 });

        const mockEvent = { preventDefault: jest.fn(), target: form };
        await handleBlockSubmit(mockEvent);

        expect(resetMessages).toHaveBeenCalled();
        expect(saveBlock).toHaveBeenCalledWith("/blocks", "POST", {
            title: "Test Title",
            key: "Test Key",
            input: "{}"
        });
    });
});
