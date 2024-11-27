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
        create table users (
            id INTEGER primary key,
            email TEXT UNIQUE not null,
            name TEXT not null,
            password TEXT not null,
            role INTEGER not null
        );

        CREATE TABLE content (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            status INTEGER NOT NULL
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

    insert(table, data) {
        const columns = Object.keys(data);
        const values = Object.values(data);

        const placeholders = columns.map(() => '?').join(', ');
        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

        connection.run(query, values, (error) => {
            if (error) {
                console.log('Error: ' + error);
                return false;
            }
            return true
        })
    }

}

module.exports = databaseAPI;