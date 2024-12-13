export const fetchBlock = async (id) => {
    const response = await fetch(`/blocks/${id}`);
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