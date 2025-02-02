const protectLoginRoutes = require('../protectLoginRoutes');

const res = { redirect: jest.fn() };
const next = jest.fn();

describe('protectLoginRoutes', () => {
  it('should redirect to /content if session.allowLogin is false', () => {
    const req = { session: { allowLogin: false } };

    protectLoginRoutes(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith('/content');
  });
  it('should redirect to /content if session.allowLogin is not set', () => {
    const req = { session: {} };

    protectLoginRoutes(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith('/content');
  });
  it('should call next if session.allowLogin is true', () => {
    const req = { session: { allowLogin: true } };

    protectLoginRoutes(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});