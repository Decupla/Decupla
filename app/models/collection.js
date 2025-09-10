const db = require('../database/database');

const getAll = async () => {
    try {
        const rows = await db.selectAll('collections');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return [];
    }
}

const add = async (data) => {
    try {
        const newId = await db.insert('collections',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        await db.updateWhere('collections', data, 'id', id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('collections', 'id', id);
        return true;
    } catch (error) {
        console.error('Error deleting data: ', error);
        return false;
    }
}

module.exports = {
    add,
    getAll,
    remove,
    update
}