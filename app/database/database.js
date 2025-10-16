const path = require('path');
const connectDatabase = require('./connection');

let connection = connectDatabase(path.join(__dirname, 'sql.db'));

const setConnection = (newConnection) => {
    connection = newConnection;
};

const databaseAPI = {
    setConnection,
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
                } else if (!result) {
                    resolve(null);
                } else {
                    resolve(result);
                }
            });
        });
    },

    selectAllWhere(table, identifier, value, sort = 'id', sortDirection = 'ASC', identifier2 = null, value2 = null) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${table} WHERE ${identifier} = ?`;
            const params = [value];

            if (identifier2 && value2 !== null) {
                query += ` AND ${identifier2} = ?`;
                params.push(value2);
            }

            if (sort) {
                query += ` ORDER BY ${sort} ${sortDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
            }

            connection.all(query, params, (error, result) => {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else if (!result || result.length === 0) {
                    resolve([]);
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

            connection.run(query, values, function (error) {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    const changes = this.changes;
                    if (changes === 0) {
                        reject(new Error(`No result found in table "${table}", where ${identifier} = ${value}`));
                    } else {
                        resolve(true);
                    }
                }
            });
        });
    },

    deleteWhere(table, identifier, value) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${table} WHERE ${identifier} = ?`;
            connection.run(query, [value], function (error) {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    const changes = this.changes;
                    if (changes === 0) {
                        reject(new Error(`No result found in table "${table}", where ${identifier} = ${value}`));
                    } else {
                        resolve(true);
                    }
                }
            });
        });
    },

    deleteAllWhere(table, identifier, value) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${table} WHERE ${identifier} = ?`;
            connection.all(query, [value], function (error, result) {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else if (result && result.changes === 0) {
                    reject(new Error(`No result found in table "${table}", where ${identifier} = ${value}`));
                } else {
                    resolve(true);
                }
            });
        });
    },

    insert(table, data) {
        return new Promise((resolve, reject) => {
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
            });
        });
    },

    getHighest(table, column) {
        return new Promise((resolve, reject) => {
            const query = `SELECT MAX(${column}) AS highestValue FROM ${table}`;
            connection.get(query, [], (error, row) => {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    resolve(row?.highestValue || 0);
                }
            });
        });
    }
};

module.exports = databaseAPI;
