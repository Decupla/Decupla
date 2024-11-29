const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('blocks',data);
        console.log(newId)
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('blocks');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('blocks','id',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('blocks',data,'id',id);
    } catch (error) {
        console.error('Error updating data: ', error);
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('blocks','id',id);
    } catch (error) {   
        console.error('Error deleting data: ', error);
    }
}

module.exports = {
    add,
    getAll,
    get,
    update,
    remove
}