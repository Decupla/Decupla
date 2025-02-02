const logoutController = require('../logoutController');

jest.mock('express-session');

const req = { session: {} };
const res = { redirect: jest.fn() };


describe('index', () => {
  it('should set session variables and redirect to /login', () => {
    logoutController.index(req, res);

    expect(req.session.authToken).toBe('');
    expect(req.session.allowLogin).toBe(true);
    expect(res.redirect).toHaveBeenCalledWith('/login');
  });
});