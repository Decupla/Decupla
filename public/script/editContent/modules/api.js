export const fetchContentBlocks = async (id) => {
    const response = await fetch(`/content/${id}/blocks`);
    return response.json();
};

export const saveContentData = async (url, method, data) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const saveBlockData = async (url, method, data) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const deleteBlockInstance = async (id) => {
    const response = await fetch(`/blocks/instances/${id}`, { method: 'DELETE' });
    return response.json();
};
