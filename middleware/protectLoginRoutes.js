const protectLoginRoutes = (req,res,next) => {
    if(!req.session.allowLogin){
        return res.redirect('/content');
    }

    next();
}

module.exports = protectLoginRoutes;