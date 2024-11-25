const db = require('../database');

const getAll = async () => {
    try {
        const rows = await db.selectAll('content');
        return rows;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

const add = () => {
    db.insert('content',{
        ID: 1,
        title: 'Home',
        status: 1
    });
}

module.exports = {
    getAll,
    add
}