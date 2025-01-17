const User = require('../models/user');
const Role = require('../models/role');

// loads permissions for renderning the ui. Not critical for the application security
const loadPermissions = async (req, res, next) => {
    // if (req.path === '/login') {
    //     return next();
    // }
    
    const userID = req.user.id;
    const user = await User.get(userID);

    if (user === null || user.role===undefined) {
        // to do: fehlermeldung auf login seite?
        return res.status(401).redirect('/login');
    }

    // if user is adminstrator, set all rights
    if (user.role === 0) {
        res.locals.permissions = ['editContent', 'manageMenus', 'manageBlocks', 'manageUsers', 'manageSettings'];
        res.locals.loggedIn = true;
        res.locals.username = user.name;
        return next();
    }

    const userRole = await Role.get(user.role);

    if (userRole === null) {
        // to do: fehlermeldung auf login seite?
        res.locals.permissions = [];
    } else {
        res.locals.permissions = userRole.perms.split(',');
    }

    res.locals.loggedIn = true;
    res.locals.username = user.name;
    return next();
}

module.exports = loadPermissions;