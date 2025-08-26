const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('collections',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

module.exports = {
    add
}