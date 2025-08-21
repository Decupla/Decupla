const db = require('../database/database');

const getAll = async () => {
    try {
        const rows = await db.selectAll('content');
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return [];
    }
}

const getAllPublished = async () => {
    try {
        const rows = await db.selectAllWhere('content','status',1);
        return rows;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return [];
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('content','id',id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

const add = async (data) => {
    try {
        const newId = await db.insert('content',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('content',data,'id',id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('content','id',id);
        return true;
    } catch (error) {   
        console.error('Error deleting data: ', error);
        return false;
    }
}

const urlExists = async (url) => {
    try {
        const result = await db.selectWhere('content', 'url', url);
        if(result===null){
            return false
        }
        return true;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return false;
    }
}

const urlChanged = async (id,url) => {
    try {
        const result = await db.selectWhere('content', 'id', id);
        if(result===null){
            return false
        }
        
        return result.url !== url;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return false;
    }
}

module.exports = {
    getAll,
    getAllPublished,
    get,
    add,
    update,
    remove,
    urlExists,
    urlChanged
}