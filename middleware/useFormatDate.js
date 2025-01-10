const formatDate = require('../helpers/formatDate');

const useFormatDate = (req,res,next) => {
    res.locals.formatDate = formatDate;
    next();
}

module.exports = useFormatDate;