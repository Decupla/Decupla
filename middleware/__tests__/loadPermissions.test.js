const loadPermissions = require('../loadPermissions');
const User = require('../../models/user');
const Role = require('../../models/role');

jest.mock('../../models/user');
jest.mock('../../models/role');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn(),
    locals: {}
};
const next = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

describe('loadPermissions', () => {
    // it('should call next if req.path is /login', async () => {
    //     req = {
    //         path: '/login'
    //     };

    //     await loadPermissions(req, res, next);

    //     expect(next).toHaveBeenCalled();
    // });

    it('should call User.get and redirect to /login if no user was found', async () => {
        req = { path: '/content', user: { id: 1 } };

        User.get.mockResolvedValue(null);

        await loadPermissions(req, res, next);

        expect(User.get).toHaveBeenCalledWith(1);
        expect(res.redirect).toHaveBeenCalledWith('/login');
        expect(next).not.toHaveBeenCalled();
    });

    it('should set permissions and call next if user is an administrator', async () => {
        req = {
            path: '/content',
            user: {
                id: 1
            }
        };

        User.get.mockResolvedValue({ id: 1, name: 'Nils', email: 'nils@gmail.com', role: 0 });

        await loadPermissions(req, res, next);

        expect(res.locals.permissions).toEqual([
            'editContent',
            'manageMenus',
            'manageBlocks',
            'manageUsers',
            'manageSettings'
        ]);
        expect(next).toHaveBeenCalled();
    });

    it('should set permissions and call next if user has role with permissions', async () => {
        req = {
            path: '/content',
            user: {
                id: 1
            }
        };

        User.get.mockResolvedValue({ id: 1, name: 'Nils', email: 'nils@gmail.com', role: 2 });

        Role.get.mockResolvedValue({ perms: 'editContent,manageMenus' });

        await loadPermissions(req, res, next);

        expect(res.locals.permissions).toEqual(['editContent', 'manageMenus']);
        expect(next).toHaveBeenCalled();
    });

    it('should set empty permissions if user role was not found', async () => {
        req = {
            path: '/content',
            user: {
                id: 1
            }
        };

        User.get.mockResolvedValue({ id: 1, name: 'Nils', email: 'nils@gmail.com', role: 2 });

        Role.get.mockResolvedValue(null);

        await loadPermissions(req, res, next);

        expect(res.locals.permissions).toEqual([]);
        expect(next).toHaveBeenCalled();
    });

})