// check if object is empty
const isEmpty = (obj) => {
    if (obj === null || typeof obj !== 'object') return false;
    return Object.keys(obj).length === 0;
}

module.exports = isEmpty;