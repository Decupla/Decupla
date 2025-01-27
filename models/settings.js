const db = require('../database/database');

const update = async (data) => {
    try {
        await db.updateWhere('settings',data,'key',data.key);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const get = async (key) => {
    try {
        const result = await db.selectWhere('settings','key',key);
        return result.value;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

module.exports = {
    update,
    get
}