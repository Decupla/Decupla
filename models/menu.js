const db = require('../database/database');

const add = async (data) => {
    try {
        const newID = await db.insert('menus',data);
        return newID;
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
        // to do: return on error
        console.error('Error retrieving data: ', error);
    }
}

module.exports = {
    add,
    getAll
}