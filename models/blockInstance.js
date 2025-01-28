const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('block_instances',data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const getByContent = async (id) => {
    try {
        const result = await db.selectAllWhere('block_instances','contentID',id,'priority','ASC');
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('block_instances',data,'id',id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('block_instances','id',id);
        return true;
    } catch (error) {   
        console.error('Error deleting data: ', error);
        return false;
    }
}

const deleteByContent = async (id) => {
    try {
        await db.deleteAllWhere('block_instances','contentID',id);
        return true;
    } catch (error) {   
        console.error('Error deleting data: ', error);
        return false;
    }
}

const deleteByBlock = async (id) => {
    try {
        await db.deleteAllWhere('block_instances','blockID',id);
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
    remove,
    deleteByContent,
    deleteByBlock
}