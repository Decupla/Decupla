const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('blockInstances',data);
        console.log(newId)
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

module.exports = {
    add
}