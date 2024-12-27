const db = require('../database/database');

const add = async (data) => {
    try {
        const newID = await db.insert('menus',data);
        return newID;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('menus');
        return rows;
    } catch (error) {
        // to do: return on error
        console.error('Error retrieving data: ', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('menus', 'id', id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        await db.updateWhere('menus', data, 'id', id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const keyExists = async (key) => {
    try {
        const result = await db.selectWhere('menus', 'key', key);
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
        const result = await db.selectWhere('menus', 'id', id);
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
    update,
    keyExists,
    keyChanged
}