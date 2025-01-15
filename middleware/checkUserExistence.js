const User = require('../models/user');

const checkUserExistence = async (req, res, next) => {
    try {
        const users = await User.getAll();
        if(users.length===0){
            req.allowSetup = true;
            return res.redirect('/setup');
        }
        next();
    } catch (error) {
        console.log(error);
        res.redirect('/setup');
    }
}

module.exports = checkUserExistence;