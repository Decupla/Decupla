const db = require('../database/database');

//ToDo: translate errors to english

const getAll = async () => {
    try {
        const rows = await db.selectAll('content');
        return rows;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
    }
}

const get = async (id) => {
    try {
        const result = await db.selectWhere('content','id',id);
        return result;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
    }
}

const add = async (data) => {
    try {
        const newId = await db.insert('content',data);
        return newId;
    } catch (error) {
        console.error('Fehler beim Einfügen der Daten: ', error);
    }
}

const update = async (id,data) => {
    try {
        await db.updateWhere('content',data,'id',id)
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Daten: ', error);
    }
}

const remove = async (id) => {
    try {
        await db.deleteWhere('content','id',id);
    } catch (error) {   
        console.error('Fehler beim Löschen der Daten: ', error);
    }
}

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}