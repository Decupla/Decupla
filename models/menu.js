const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('menus',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('menus');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

module.exports = {
    add,
    getAll
}