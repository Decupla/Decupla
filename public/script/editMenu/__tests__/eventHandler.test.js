import { handleFormSubmit } from "../modules/eventHandler";
import { saveMenu } from "../modules/api";
import { entries, menuExists, menuID, setMenuExists, setMenuID } from "../modules/data";
import { setFieldMessage, resetMessages } from "../modules/validation";

jest.mock("../modules/api", () => ({
    saveMenu: jest.fn(),
}));

jest.mock("../modules/data", () => ({
    entries: [],
    menuExists: false,
    menuID: null,
    setMenuExists: jest.fn(),
    setMenuID: jest.fn(),
}));

jest.mock("../modules/validation", () => ({
    setFieldMessage: jest.fn(),
    resetMessages: jest.fn(),
}));

describe("handleFormSubmit", () => {
    let event;

    beforeEach(() => {
        jest.clearAllMocks();

        event = {
            preventDefault: jest.fn(),
            target: {
                elements: [
                    { name: "name", value: "Test Menu" },
                    { name: "description", value: "Test Description" },
                ],
            },
        };

        global.FormData = jest.fn(() => ({
            entries: jest.fn(() => [
                ["name", "Test Menu"],
                ["description", "Test Description"],
            ]),
        }));
    });

    it("should call resetMessages and prevent default event behavior", async () => {
        saveMenu.mockResolvedValue({ success: true, newID: 1, validation: true });

        await handleFormSubmit(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(resetMessages).toHaveBeenCalled();
    });

    it("should call saveMenu with correct parameters for  new menu", async () => {
        saveMenu.mockResolvedValue({ success: true, newID: 1, validation: true });

        await handleFormSubmit(event);

        expect(saveMenu).toHaveBeenCalledWith("/menus", "POST", {
            name: "Test Menu",
            description: "Test Description",
            entries: JSON.stringify([]),
        });
    });

    it("should call saveMenu with correct parameters for existing menu", async () => {
        require("../modules/data").menuExists = true;
        require("../modules/data").menuID = 1;

        saveMenu.mockResolvedValue({ success: true, newID: 1, validation: true });

        await handleFormSubmit(event);

        expect(saveMenu).toHaveBeenCalledWith("/menus/1", "PUT", {
            name: "Test Menu",
            description: "Test Description",
            entries: JSON.stringify([]),
        });
    });

    it("should set validation error messages", async () => {
        saveMenu.mockResolvedValue({
            validation: false,
            messages: { name: "Name is required"},
        });

        await handleFormSubmit(event);

        expect(setFieldMessage).toHaveBeenCalledWith("name", "Name is required");
    });

    it("should update menuID  menuExistence when new menu was created", async () => {
        require("../modules/data").menuExists = false;
        require("../modules/data").menuID = null;
    
        saveMenu.mockResolvedValue({ success: true, newID: 1, validation: true });
    
        await handleFormSubmit(event);
    
        expect(setMenuID).toHaveBeenCalledWith(1);
        expect(setMenuExists).toHaveBeenCalledWith(true);
    });
    

    it("should log errors if saveMenu fails", async () => {
        console.error = jest.fn();
        saveMenu.mockRejectedValue(new Error("Network error"));

        await handleFormSubmit(event);

        expect(console.error).toHaveBeenCalledWith("Something went wrong:", expect.any(Error));
    });
});
