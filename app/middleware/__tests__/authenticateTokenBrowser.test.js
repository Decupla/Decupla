const authenticateTokenBrowser = require("../authenticateTokenBrowser");
const jwt = require('jsonwebtoken');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};
const next = jest.fn();

beforeEach(() => {
    req = { path: '' };
});

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));


describe('authenticateTokenBrowser', () => {
    // it('should call next if req.path is /login', () => {
    //     req = {
    //         path: '/login',
    //         session: {}
    //     };

    //     authenticateTokenBrowser(req, res, next);

    //     expect(next).toHaveBeenCalled();
    // })
    it('should redirect to /login if authToken is undefined', () => {
        req = {
            path: '/content',
            session: {}
        };

        authenticateTokenBrowser(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/login');
    })
    it('should redirect to /login if authToken is invalid', () => {
        req = {
            path: '/content',
            session: {
                authToken: 'invalidToken'
            }
        };

        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

        authenticateTokenBrowser(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/login');
    })
    it('should set req.user and call next if token is valid', () => {
        req = {
            path: '/content',
            session: {
                authToken: 'validToken'
            }
        };

        const mockUser = { id: 1, name: 'Nils' };
        jwt.verify.mockImplementation(() => mockUser);
        authenticateTokenBrowser(req, res, next);

        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });
})