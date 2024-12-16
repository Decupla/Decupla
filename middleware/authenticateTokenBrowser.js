const jwt = require('jsonwebtoken');

const authenticateTokenBrowser = (req, res, next) => {
    if (req.path === '/login') {
        return next();
    }

    const token = req.session.authToken;
    if(token===undefined){
        return res.status(401).redirect('/login');
    }

    jwt.verify(token,process.env.TOKEN_SECRET, (error)=>{
        if(error){
            return res.status(401).redirect('/login');
        }
        next();
    })
}

module.exports = authenticateTokenBrowser;