const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('blockInstances',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

module.exports = {
    add
}