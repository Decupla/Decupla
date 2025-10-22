const db = require('../database/database');

const getAll = async (tenantID) => {
    try {
        const rows = await db.selectAllWhere('collections','tenantID',tenantID);
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return [];
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('collections', 'id', id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}


const add = async (data) => {
    try {
        const newId = await db.insert('collections',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        await db.updateWhere('collections', data, 'id', id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('collections', 'id', id);
        return true;
    } catch (error) {
        console.error('Error deleting data: ', error);
        return false;
    }
}

const keyExists = async (key) => {
    try {
        const result = await db.selectWhere('collections', 'key', key);
        if(result===null){
            return false
        }
        return true;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return false;
    }
}

const keyChanged = async (id,key) => {
    try {
        const result = await db.selectWhere('collections', 'id', id);
        if(result===null){
            console.log(`Error while checking if key changed: No menu with id '${id}' found.`);
            return false
        }
        
        return result.key !== key;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return false;
    }
}

module.exports = {
    add,
    getAll,
    get,
    remove,
    update,
    keyExists,
    keyChanged
}