import { getBlockByKey } from "./api";

// checks if we are creating a new block or editing a existing block
export const checkIfExists = (path) => {
    const regex = /^\/blocks\/edit\/(\d+)$/;
    return path.match(regex);
}

export const getId = (path) => {
    const parts = path.split("/");
    const id = parts[parts.length - 1];
    return parseInt(id);
}

export const keyExists = async (key) => {
    const result = await getBlockByKey(key);
    console.log(result);
    return result.success;
}