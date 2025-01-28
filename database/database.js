const connectDatabase = require('./connection');

let connection = connectDatabase('./database/sql.db');

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

    selectAllWhere(table, identifier, value, sort = 'id', sortDirection = 'ASC') {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${table} WHERE ${identifier} = ?`;
    
            if (sort) {
                query += ` ORDER BY ${sort} ${sortDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
            }
    
            connection.all(query, [value], (error, result) => {
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
    
    

    updateWhere(table, data, identifier, value) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = columns.map((column) => `${column} = ?`).join(', ');
    
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${table} SET ${placeholders} WHERE ${identifier} = ?`;
            values.push(value);
    
            connection.run(query, values, function(error) {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    if (this.changes === 0) {
                        reject(new Error(`No result found in table "${table}", where ${identifier} = ${value}`));
                    } else {
                        resolve(true);
                    }
                }
            });
        });
    },
    
    deleteWhere(table, identifier, value) {
        return new Promise((resolve, reject)=>{
            const query = `DELETE FROM ${table} WHERE ${identifier} = ?`;
            connection.run(query, [value], function(error) {
                if (error) {
                    console.log('Error: ' + error);
                    reject(error);
                } else {
                    if (this.changes === 0) {
                        reject(new Error(`No result found in table "${table}", where ${identifier} = ${value}`));
                    } else {
                        resolve(true);
                    }
                }
            })
        })  
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