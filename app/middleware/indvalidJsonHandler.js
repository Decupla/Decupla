const invalidJsonHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json('Invalid Request Body');
    }
    next(err);
  }

module.exports = invalidJsonHandler;