const db = require('../database/database');

const add = async (data) => {
    try {
        const newID = await db.insert('api_keys',data);
        return newID;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('api_keys');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return [];
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('api_keys','id',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('api_keys',data,'id',id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('api_keys','id',id);
        return true;
    } catch (error) {   
        console.error('Error deleting data: ', error);
        return false;
    }
}

const APIKeyValid = async (key) => {
    try {
        const result = await db.selectWhere('api_keys','key',key);
        if(result===null){
            return false
        }
        return true;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return false;
    }
}

module.exports = {
    add,
    getAll,
    get,
    update,
    remove,
    APIKeyValid
}