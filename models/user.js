const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('users',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
    }
}

module.exports = {
    add
}