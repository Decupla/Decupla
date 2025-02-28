const protectSetupRoutes = (req,res,next) => {
    console.log(req.session.allowSetup);
    if(!req.session.allowSetup){
        return res.redirect('/');
    }

    next();
}

module.exports = protectSetupRoutes;