const db = require('../database/database');

const getNextTenantId = async () => {
    try {
        const lastId = await db.getHighest('users', 'tenantID');
        return lastId + 1;
    } catch (err) {
        console.error('Fehler beim Ermitteln der Tenant-ID:', err);
        return 1;
    }
};


module.exports = {
    getNextTenantId
}