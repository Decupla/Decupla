const db = require('../database');

const getAll = async () => {
    try {
        const rows = await db.selectAll('content');
        return rows;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('content','id',id);
        return result;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

const add = (data) => {
    return db.insert('content',data);
}

module.exports = {
    getAll,
    get,
    add
}