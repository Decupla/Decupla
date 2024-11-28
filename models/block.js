const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('blocks',data);
        console.log(newId)
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
    }
}

const getAll = async (data) => {
    try {
        const rows = await db.selectAll('blocks');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

module.exports = {
    add,
    getAll
}