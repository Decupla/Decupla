const db = require('../database/database');

const add = async (data) => {
    try {
        const newId = await db.insert('blocks', data);
        return newId;
    } catch (error) {
        console.error('Error inserting data: ', error);
        return null;
    }
}

const getAll = async () => {
    try {
        const rows = await db.selectAll('blocks');
        return rows;
    } catch (error) {
        // to do: return wert bei fehler
        console.error('Error retrieving data: ', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('blocks', 'id', id);
        return result;
    } catch (error) {
        console.error('Error retrieving data: ', error);
        return null;
    }
}

// const getByKey = async (key) => {
//     try {
//         const result = await db.selectWhere('blocks', 'key', key);
//         return result;
//     } catch (error) {
//         console.error('Error retrieving data: ', error);
//         return null;
//     }
// }

const update = async (id, data) => {
    try {
        await db.updateWhere('blocks', data, 'id', id);
        return true;
    } catch (error) {
        console.error('Error updating data: ', error);
        return false;
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('blocks', 'id', id);
        return true;
    } catch (error) {
        console.error('Error deleting data: ', error);
        return false;
    }
}

const keyExists = async (key) => {
    try {
        const result = await db.selectWhere('blocks', 'key', key);
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
        const result = await db.selectWhere('blocks', 'id', id);
        if(result===null){
            console.log(`Error while checking if key changed: No Block with id '${id}' found.`);
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
    remove,
    keyExists,
    keyChanged
}