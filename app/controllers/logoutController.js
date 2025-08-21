const index = (req,res) => {
    req.session.authToken = "";
    req.session.allowLogin = true;
    res.redirect('/login');
}

module.exports = {
    index
}