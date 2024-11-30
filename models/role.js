const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('roles',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('roles');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('roles','id',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('roles',data,'id',id);
    } catch (error) {
        console.error('Error updating data: ', error);
    }
}

module.exports = {
    add,
    getAll,
    get,
    update
}