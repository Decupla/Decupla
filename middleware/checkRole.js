const User = require('../models/user');
const Role = require('../models/role');

const checkRole = (permission) => {
    return async (req, res, next) => {
        try {
            const userID = req.user.id;
            const user = await User.get(userID);

            if (!user) {
                req.session.allowLogin = true;
                return res.redirect('/login');
            }

            // check if user is administrator
            if(user.role===0){
                req.session.allowLogin = false;
                return next();
            }

            const userRole = await Role.get(user.role);

            let perms;

            if(userRole===null){
                perms = []; 
            } else {
                perms = userRole.perms.split(',');
            }

            if(perms.includes(permission)){
                next();
            } else {
                res.status(403).render('notAllowed',{
                    title: 'Not Allowed'
                })
            }

        } catch (error) {
            console.error(error);
            req.session.allowLogin = true;
            return res.redirect('/login');
        }
    };
};


module.exports = checkRole;