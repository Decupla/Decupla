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

const db = connectDatabase();
module.exports = db;