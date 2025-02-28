const User = require('../models/user');

const checkUserExistence = async (req, res, next) => {
    console.log('user existence check');
    console.log(req.session);
    try {
        const users = await User.getAll();
        if(users.length===0){
            req.session.allowSetup = true; 
            return res.redirect('/setup');
        }
        req.session.allowSetup = false;
        next();
    } catch (error) {
        console.log(error);
        req.session.allowSetup = true;
        res.redirect('/setup');
    }
}

module.exports = checkUserExistence;