const fs = require('fs');
const sqlite = require('sqlite3');

const connectDatabase = (file) => {
    if (fs.existsSync(file)) {
        return new sqlite.Database(file, sqlite.OPEN_READWRITE, (error) => {
            if (error) {
                console.log(error);
                process.exit(1);
            }
        });
    } else {
        const db = new sqlite.Database(file, (error) => {
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
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            role INTEGER NOT NULL
        );
        
        CREATE TABLE roles (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            perms TEXT NOT NULL
        );

        CREATE TABLE content (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            status INTEGER NOT NULL,
            created INTEGER,
            updated INTEGER
        );

        CREATE TABLE blocks (
            id INTEGER PRIMARY KEY,
            key TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            input TEXT NOT NULL,
            created INTEGER,
            updated INTEGER
        );

        CREATE TABLE blockInstances (
            id INTEGER PRIMARY KEY,
            blockID INTEGER NOT NULL,
            contentID INTEGER NOT NULL,
            output TEXT NOT NULL,
            priority INTEGER NOT NULL
        );

        CREATE Table menus (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            key TEXT UNIQUE NOT NULL,
            entries TEXT NOT NULL
        );

        CREATE TABLE media (
            id INTEGER PRIMARY KEY,
            file TEXT NOT NULL
        );
    `);
}


module.exports = connectDatabase;