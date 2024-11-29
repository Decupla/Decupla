const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('users',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('users');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

module.exports = {
    add,
    getAll
}