const User = require('../models/user');
const Role = require('../models/role');

const checkRole = (permission) => {
    return async (req, res, next) => {
        try {
            const user = await User.get(req.user.id);

            if (!user) {
                req.session.allowLogin = true;
                return res.redirect('/login');
            }

            if (user.role === 0) {
                req.session.allowLogin = false;
                return next();
            }

            const userRole = await Role.get(user.role);
            const perms = userRole ? userRole.perms.split(',') : [];


            if (perms.includes(permission)) {
                return next();
            }

            return res.status(403).render('notAllowed', {
                title: 'Not Allowed'
            })

        } catch (error) {
            console.error(error);
            req.session.allowLogin = true;
            return res.redirect('/login');
        }
    };
};

module.exports = checkRole;
