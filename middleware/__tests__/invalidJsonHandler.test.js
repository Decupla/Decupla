const invalidJsonHandler = require('../indvalidJsonHandler');

const req = {};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};
const next = jest.fn();

describe('invalidJsonHandler', () => {
  it('should send status 400 if Error is SyntaxError', () => {
    const error = new SyntaxError('Unexpected token');
    invalidJsonHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Invalid Request Body');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if Error is no SyntaxError', () => {
    const error = new Error('Something went wrong');
    invalidJsonHandler(error, req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});