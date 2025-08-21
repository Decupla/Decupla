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

const get = async (id) => {
    try {
        const result = await db.selectWhere('media','id',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('media');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return [];
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('media',data,'id',id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('media','id',id);
        return true;
    } catch (error) {   
        console.error('Error deleting data: ', error);
        return false;
    }
}

module.exports = {
    add,
    get,
    update,
    getAll,
    remove
}