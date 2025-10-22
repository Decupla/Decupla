const jwt = require('jsonwebtoken');

const authenticateTokenBrowser = (req, res, next) => {

    const token = req.session.authToken;
    req.session.allowLogin = true;

    if(token===undefined){
        return res.redirect('/login');
    }

    try {
        const currentUser = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = currentUser;
        req.session.allowLogin = false;
        next();
    } catch(error){
        console.error('middleware error');
        console.log(error);
        return res.redirect('/login');
    }
}

module.exports = authenticateTokenBrowser;