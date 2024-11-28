const fs = require('fs');
const sqlite = require('sqlite3');

const connectDatabase = () => {
    if (fs.existsSync('./database/sql.db')) {
        return new sqlite.Database('./database/sql.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) {
                console.log(error);
                process.exit(1);
            }
        });
    } else {
        const db = new sqlite.Database('./database/sql.db', (error) => {
            if (error) {
                console.log(error);
                process.exit(1);
            }
            createTables(db);
        });
        return db;
    }
}

const createTables = (database) => {
    database.exec(`
        CREATE TABLE users (
            id INTEGER primary key,
            email TEXT UNIQUE not null,
            name TEXT not null,
            password TEXT not null,
            role INTEGER not null
        );
        
        CREATE TABLE roles (
            id INTEGER primary key,
            name TEXT not null,
            perms TEXT not null
        );

        CREATE TABLE content (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            status INTEGER NOT NULL
        );

        CREATE TABLE blocks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            input TEXT NOT NULL,
            status INTEGER NOT NULL
        );

        CREATE TABLE blockInstances (
            id INTEGER PRIMARY KEY,
            blockId INTEGER NOT NULL,
            output TEXT NOT NULL
        );

        CREATE TABLE media (
            id INTEGER PRIMARY KEY,
            file TEXT NOT NULL
        );
    `);
}

const connection = connectDatabase();

const databaseAPI = {
    selectAll(table) {
        return new Promise((resolve, reject) => {
            connection.all(`SELECT * FROM ${table}`, (error, rows) => {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    selectWhere(table, identifier, value) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE ${identifier} = ?`;
            connection.get(query, [value], (error, result) => {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    updateWhere(table, data, identifier, value) {
        const columns = Object.keys(data);
        const values = Object.values(data);

        const placeholders = columns.map((column) => `${column} = ?`).join(', ');

        return new Promise((resolve, reject) => {
            const query = `UPDATE ${table} SET ${placeholders} WHERE ${identifier} = ?`;
            values.push(value);
            connection.run(query, values, (error) => {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        })
    },

    deleteWhere(table, identifier, value) {
        return new Promise((resolve, reject)=>{
            const query = `DELETE FROM ${table} WHERE ${identifier} = ?`;
            connection.run(query, [value], (error) => {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        })  
    },

    insert(table, data) {
        return new Promise((resolve,reject)=>{
            const columns = Object.keys(data);
            const values = Object.values(data);
    
            const placeholders = columns.map(() => '?').join(', ');
            const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
    
            connection.run(query, values, function (error) {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }

}

module.exports = databaseAPI;