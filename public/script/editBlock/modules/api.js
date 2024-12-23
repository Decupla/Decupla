export const getBlockById = async (id) => {
    const response = await fetch(`/blocks/${id}`);
    return response.json();
}

export const getBlockByKey = async (key) => {
    const response = await fetch(`/blocks/key/${key}`);
    return response.json();
}

export const saveBlock = async (url, method, data) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};