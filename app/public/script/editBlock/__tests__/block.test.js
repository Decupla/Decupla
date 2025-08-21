import { checkIfExists, getId, keyExists } from "../modules/block";
import { getBlockByKey } from "../modules/api";

jest.mock("../modules/api", () => ({
    getBlockByKey: jest.fn()
}));

describe("checkIfExists", () => {
    it("should return match if url is valid", () => {
        const path = "/blocks/edit/1";
        const result = checkIfExists(path);
        expect(result[1]).toBe('1');
    });

    it("should return null if url is invalid", () => {
        const path = "/blocks/edit/";
        const result = checkIfExists(path);
        expect(result).toBeNull();
    });
});

describe("getId", () => {
    it("should extract the ID from url", () => {
        const path = "/blocks/edit/1";
        const result = getId(path);
        expect(result).toBe(1);
    });
});

describe("keyExists", () => {
    it("should return true if key exists", async () => {
        getBlockByKey.mockResolvedValue({ success: true });

        const result = await keyExists("validKey");

        expect(result).toBe(true);

        expect(getBlockByKey).toHaveBeenCalledWith("validKey");
    });

    it("should return false if key does not exist", async () => {
        getBlockByKey.mockResolvedValue({ success: false });

        const result = await keyExists("invalidKey");

        expect(result).toBe(false);

        expect(getBlockByKey).toHaveBeenCalledWith("invalidKey");
    });
});
