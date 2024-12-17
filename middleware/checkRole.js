const User = require('../models/user');
const Role = require('../models/role');

const checkRole = (role) => {
    return async (req, res, next) => {
        try {
            const userID = req.user.id;
            const user = await User.get(userID);

            if (!user) {
                return res.status(401).redirect('/login');
            }

            // check if user is administrator
            if(user.role===0){
                return next();
            }

            const userRole = await Role.get(user.role);

            const perms = userRole.perms.split(',');

            if(perms.includes(role)){
                next();
            } else {
                res.status(403).render('notAllowed',{
                    title: 'Not Allowed'
                })
            }

        } catch (error) {
            console.error(error);
            return res.status(400).redirect('/login');
        }
    };
};


module.exports = checkRole;