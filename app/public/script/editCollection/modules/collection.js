export const checkIfExists = (path) => {
    const regex = /^\/collections\/edit\/(\d+)$/;
    return regex.test(path);
}

export const getId = (path) => {
    const parts = path.split("/");
    const id = parts[parts.length - 1];
    return parseInt(id);
}