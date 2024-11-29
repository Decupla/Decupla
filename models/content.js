const db = require('../database/database');

const getAll = async () => {
    try {
        const rows = await db.selectAll('content');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('content','id',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

const add = async (data) => {
    try {
        const newId = await db.insert('content',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('content',data,'id',id)
    } catch (error) {
        console.error('Error updating data: ', error);
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('content','id',id);
    } catch (error) {   
        console.error('Error deleting data: ', error);
    }
}

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}