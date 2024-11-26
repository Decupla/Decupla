const db = require('../database');

const getAll = async () => {
    try {
        const rows = await db.selectAll('content');
        return rows;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

const add = (data) => {
    return db.insert('content',data);
}

module.exports = {
    getAll,
    add
}