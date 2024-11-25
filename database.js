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
            id int primary key not null,
            email string UNIQUE not null,
            name string not null,
            password string not null,
            role int not null
        );

        create table content (
            id int primary key not null,
            title string not null,
            status int not null
        );
    `);
}

const connection = connectDatabase();

const databaseAPI = {
    selectAll (table) {
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

    insert (table,data) {
        const columns = Object.keys(data);
        const values = Object.values(data); 

        const placeholders = columns.map(() => '?').join(', ');
        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

        connection.run(query,values, (error) => {
            if(error){
                console.log('Error: ' + error);
                return false;
            }
            return true
        })
    }

}

module.exports = databaseAPI;