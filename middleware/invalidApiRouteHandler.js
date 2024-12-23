const invalidApiRouteHandler = (req, res, next) => {
    // to do: 404 page?
    const path = req.path;
    res.status(404).send(`'${path}' is not a valid API-Route. Check the documentation to see all valid API-Routes.`)
}

module.exports = invalidApiRouteHandler;