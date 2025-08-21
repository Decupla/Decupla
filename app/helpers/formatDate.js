const dayjs = require('dayjs');

const formatDate = (timestamp) => {
    const date = dayjs(timestamp).format('DD.MM.YYYY');
    return date;
}

module.exports = formatDate;