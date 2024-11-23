const db = require('../database');

const getAll = () => {
    console.log(db.selectAll('content'))
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