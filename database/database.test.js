const sqlite3 = require('sqlite3').verbose();
const databaseAPI = require('./database');

const createTestDatabase = () => {
    const db = new sqlite3.Database(':memory:');
    db.serialize(() => {
        db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)`);
        db.run(`INSERT INTO users (name, age) VALUES ('Nils', 30), ('Bob', 25), ('Peter', 30)`);
    });
    return db;
};

let connection;
const mockError = new Error('Database error');

beforeAll(() => {
    connection = createTestDatabase();
    databaseAPI.setConnection(connection);

    jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterAll(() => {
    connection.close();
    jest.restoreAllMocks();
});

describe('selectAll', () => {
    it('should select all rows from a table', async () => {
        const rows = await databaseAPI.selectAll('users');
        expect(rows).toEqual([
            { id: 1, name: 'Nils', age: 30 },
            { id: 2, name: 'Bob', age: 25 },
            { id: 3, name: 'Peter', age: 30 }
        ]);
    });

    it('should log and reject error', async () => {
        jest.spyOn(connection, 'all').mockImplementation((query, callback) => {
            callback(mockError, null);
        });

        await expect(databaseAPI.selectAll('users')).rejects.toThrow('Database error');
        expect(console.log).toHaveBeenCalledWith('Error: ' + mockError);
    });
});

describe('selectWhere', () => {
    it('should select a specific row from database table', async () => {
        const row = await databaseAPI.selectWhere('users', 'id', 1);
        expect(row).toEqual({ id: 1, name: 'Nils', age: 30 });
    });

    it('should log and reject error', async () => {
        jest.spyOn(connection, 'get').mockImplementation((query, params, callback) => {
            callback(mockError, null);
        });

        await expect(databaseAPI.selectWhere('users', 'id', 1)).rejects.toThrow('Database error');
        expect(console.log).toHaveBeenCalledWith('Error: ' + mockError);
    });

    it('should resolve null if no row was found', async () => {
        jest.spyOn(connection, 'get').mockImplementation((query, params, callback) => {
            callback(null, null);
        });

        const result = await databaseAPI.selectWhere('users', 'id', 90);
        expect(result).toBeNull();
    });
});

describe('selectAllWhere', () => {
    it('should select multiple specific rows from database table', async () => {
        jest.spyOn(connection, 'all').mockImplementation((query, params, callback) => {
            const mockRows = [
                { id: 1, name: 'Nils', age: 30 },
                { id: 3, name: 'Peter', age: 30 }
            ];
            callback(null, mockRows);
        });

        const rows = await databaseAPI.selectAllWhere('users', 'age', 30);
        expect(rows).toEqual([
            { id: 1, name: 'Nils', age: 30 },
            { id: 3, name: 'Peter', age: 30 }
        ]);
    });

    it('should log and reject error', async () => {
        jest.spyOn(connection, 'all').mockImplementation((query, params, callback) => {
            callback(mockError, null);
        });

        await expect(databaseAPI.selectAllWhere('users', 'age', 30)).rejects.toThrow('Database error');
        expect(console.log).toHaveBeenCalledWith('Error: ' + mockError);
    });

    it('should resolve null if no row was found', async () => {
        jest.spyOn(connection, 'all').mockImplementation((query, params, callback) => {
            callback(null, null);
        });

        const rows = await databaseAPI.selectAllWhere('users', 'age', 30);
        expect(rows).toBeNull();

    })
});

describe('updateWhere', () => {
    it('should update a specific row', async () => {
        jest.spyOn(connection, 'run').mockImplementation((query, params, callback) => {
            callback(null);
        });

        await databaseAPI.updateWhere('users', { age: 40 }, 'name', 'Nils');

        jest.spyOn(connection, 'get').mockImplementation((query, params, callback) => {
            callback(null, { id: 1, name: 'Nils', age: 40 });
        });

        const row = await databaseAPI.selectWhere('users', 'name', 'Nils');
        expect(row.age).toBe(40);
    });
    it('should log and reject error', async () => {
        jest.spyOn(connection, 'run').mockImplementation((query, params, callback) => {
            callback(mockError, null);
        });

        await expect(databaseAPI.updateWhere('users', 'name', 'Nils')).rejects.toThrow('Database error');
        expect(console.log).toHaveBeenCalledWith('Error: ' + mockError);
    })
    it('should reject if no row was updated', async () => {
        jest.spyOn(connection, 'run').mockImplementationOnce(function(query, values, callback) {
            const mockStatement = { changes: 0 };
            callback.call(mockStatement, null);
        });
    
        await expect(databaseAPI.updateWhere('users', { age: 40 }, 'name', 'Sven')).rejects.toThrow('No result found in table "users", where name = Sven');
    });
    
});

describe('deleteWhere', () => {
    it('should delete a specific row from database table', async () => {
        jest.spyOn(connection, 'run').mockImplementation((query, params, callback) => {
            callback(null); 
        });

        const result = await databaseAPI.deleteWhere('users', 'name', 'Peter');
        
        expect(result).toBe(true);
    });

    it('should log and reject error if delete operation fails', async () => {
        jest.spyOn(connection, 'run').mockImplementation((query, params, callback) => {
            callback(mockError, null);
        });

        await expect(databaseAPI.deleteWhere('users', 'name', 'Peter')).rejects.toThrow('Database error');
        expect(console.log).toHaveBeenCalledWith('Error: ' + mockError);
    });

    it('should reject if no row was found to delete', async () => {
        jest.spyOn(connection, 'run').mockImplementationOnce(function(query, values, callback) {
            const mockStatement = { changes: 0 };
            callback.call(mockStatement, null);
        });

        await expect(databaseAPI.deleteWhere('users', 'name', 'Peter')).rejects.toThrow('No result found in table "users", where name = Peter');
    })
});

describe('deleteAllWhere', () => {
    it('should delete specific rows from the table and resolve true', async () => {
        jest.spyOn(connection, 'all').mockImplementation((query, params, callback) => {
            callback(null, { changes: 3 });
        });

        const result = await databaseAPI.deleteAllWhere('users', 'age', 30);
        expect(result).toBe(true);
    });

    it('should reject with an error if there is a database error', async () => {
        jest.spyOn(connection, 'all').mockImplementation((query, params, callback) => {
            callback(new Error('Database error'));
        });

        await expect(databaseAPI.deleteAllWhere('users', 'age', 30)).rejects.toThrow('Database error');
    });

    it('should reject with an error if no rows are found to delete', async () => {
        jest.spyOn(connection, 'all').mockImplementation((query, params, callback) => {
            callback(null, { changes: 0 });
        });

        await expect(databaseAPI.deleteAllWhere('users', 'age', 18)).rejects.toThrow('No result found in table "users", where age = 18');
    });
});

describe('insert', () => {
    it('should insert a new row into database table and resolve with the last inserted ID', async () => {
        jest.spyOn(connection, 'run').mockImplementation(function (query, params, callback) {
            callback.call({ lastID: 1 }, null);
        });

        const result = await databaseAPI.insert('users', { name: 'Alice', age: 25 });
        expect(result).toBe(1);
    });

    it('should reject with an error if there is a database error', async () => {
        jest.spyOn(connection, 'run').mockImplementation((query, params, callback) => {
            callback(new Error('Database error'));
        });

        await expect(databaseAPI.insert('users', { name: 'Alice', age: 25 }))
            .rejects.toThrow('Database error');
    });
});


