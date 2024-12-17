const jwt = require('jsonwebtoken');

const authenticateTokenBrowser = (req, res, next) => {
    if (req.path === '/login') {
        return next();
    }

    const token = req.session.authToken;
    if(token===undefined){
        return res.status(401).redirect('/login');
    }

    try {
        const currentUser = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = currentUser;
        next();
    } catch(error){
        console.log(error);
        return res.status(401).redirect('/login');
    }
}

module.exports = authenticateTokenBrowser;