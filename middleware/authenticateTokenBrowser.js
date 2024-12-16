const jwt = require('jsonwebtoken');

const authenticateTokenBrowser = (req, res, next) => {
    const token = req.session.authToken;
    if(token===undefined){
        return res.redirect('/login');
    }

    jwt.verify(token,process.env.TOKEN_SECRET, (error)=>{
        if(error){
            return res.redirect('/login');
        }
        next();
    })
}

module.exports = authenticateTokenBrowser;