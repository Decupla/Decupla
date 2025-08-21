const protectSetupRoutes = (req,res,next) => {
    if(!req.session.allowSetup){
        return res.redirect('/');
    }

    next();
}

module.exports = protectSetupRoutes;