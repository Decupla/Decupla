const invalidRouteHandler = (request, response, next) => {
    // to do: 404 page?
    response.status(404).redirect('/content')
}

module.exports = invalidRouteHandler;