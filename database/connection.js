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
            blockID INTEGER NOT NULL,
            contentID INTEGER NOT NULL,
            output TEXT NOT NULL
        );

        CREATE Table menus (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            entries TEXT NOT NULL
        );

        CREATE TABLE media (
            id INTEGER PRIMARY KEY,
            file TEXT NOT NULL
        );
    `);
}

const connection = connectDatabase();

module.export = connection;