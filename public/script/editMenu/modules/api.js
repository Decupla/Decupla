export const saveMenu = async (url, method, data) => {
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const getMenuById = async (id) => {
    const response = await fetch(`/menus/${id}`);
    return response.json();
}