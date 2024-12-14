const authenticateTokenBrowser = (req, res, next) => {
    return res.redirect('/login');
}

module.exports = authenticateTokenBrowser;