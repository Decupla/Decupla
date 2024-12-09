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

const getByContent = async (id) => {
    try {
        const result = await db.selectAllWhere('blockInstances','contentID',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('blockInstances',data,'id',id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const deleteByContent = async (id) => {
    try {
        await db.deleteAllWhere('blockInstances','contentID',id);
        return true;
    } catch (error) {   
        console.error('Error deleting data: ', error);
        return false;
    }
}

module.exports = {
    add,
    getByContent,
    update,
    deleteByContent
}