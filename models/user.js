const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('users',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('users');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('users','id',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('users',data,'id',id)
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('users','id',id);
        return true;
    } catch (error) {   
        console.error('Error deleting data: ', error);
        return false;
    }
}

module.exports = {
    add,
    getAll,
    get,
    update,
    remove
}