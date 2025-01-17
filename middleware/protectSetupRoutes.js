const protectSetupRoutes = (req,res,next) => {
    if(!req.allowSetup){
        return res.redirect('/');
    }

    next();
}

module.exports = protectSetupRoutes;