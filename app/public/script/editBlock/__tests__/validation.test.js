import { validateInput, setFieldMessage, resetMessages } from "../modules/validation";
import { submittedForm } from "../modules/data";

jest.mock("../modules/data", () => ({
    inputData: [{ params: { name: "existingName" } }],
    submittedForm: {
        querySelector: jest.fn(),
    },
}));

describe("validateInput", () => {
    it("should return false if 'name' is missing", () => {
        const data = { label: "Test Label" };
        expect(validateInput(data)).toBe(false);
    });

    it("should return false if 'name' contains spaces", () => {
        const data = { name: "invalid name", label: "Test Label" };
        expect(validateInput(data)).toBe(false);
    });

    it("should return false if 'label' is missing", () => {
        const data = { name: "validName" };
        expect(validateInput(data)).toBe(false);
    });

    it("should return false if name already exists", () => {
        const data = { name: "existingName", label: "Test Label" };
        expect(validateInput(data, true)).toBe(false);
    });

    it("should return true if input is valid", () => {
        const data = { name: "validName", label: "Test Label" };
        expect(validateInput(data)).toBe(true);
    });
});

describe("setFieldMessage", () => {
    let messageElement;

    beforeEach(() => {
        messageElement = document.createElement("div");
        messageElement.classList.add("message-name");
        document.body.appendChild(messageElement);

        submittedForm.querySelector.mockImplementation((selector) => {
            return selector === ".message-name" ? messageElement : null;
        });
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("should set the error message", () => {
        setFieldMessage("name", "Test error message");

        expect(messageElement.innerText).toBe("Test error message");
        expect(messageElement.classList.contains("visible")).toBe(true);
    });

    it("should log error if field does not exist", () => {
        console.log = jest.fn();
        setFieldMessage("nonExistent", "Error message");

        expect(console.log).toHaveBeenCalledWith('Field "nonExistent" does not exist.');
    });
});

describe("resetMessages", () => {
    it("should clear all error messages", () => {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message", "visible");
        errorMessage.innerText = "Some error";
        document.body.appendChild(errorMessage);

        resetMessages();

        expect(errorMessage.innerText).toBe("");
        expect(errorMessage.classList.contains("visible")).toBe(false);
    });
});
