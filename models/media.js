const db = require('../database/database');

const add = async (data) => {
    try {
        const newID = await db.insert('media',data);
        return newID;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

module.exports = {
    add
}