const invalidRouteHandler = (req, res, next) => {
    // to do: 404 page?
    res.redirect('/content')
}

module.exports = invalidRouteHandler;