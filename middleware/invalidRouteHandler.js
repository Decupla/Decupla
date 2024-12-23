const invalidRouteHandler = (req, res, next) => {
    // to do: 404 page?
    res.status(404).redirect('/content')
}

module.exports = invalidRouteHandler;