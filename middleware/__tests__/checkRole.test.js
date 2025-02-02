const checkRole = require('../checkRole')
const User = require('../../models/user');
const Role = require('../../models/role');

jest.mock('../../models/user');
jest.mock('../../models/role');

let req = {
    session: {},
    user: {
        id: 1
    }
};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};
const next = jest.fn();

beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
});

describe('checkRole', () => {
    it('should call User.get and redirect to login if no user was found', async () => {
        User.get.mockReturnValue(null);

        await checkRole('author')(req, res, next);

        expect(User.get).toHaveBeenCalledWith(1);
        expect(res.redirect).toHaveBeenCalledWith('/login');
    })


    it('should call next if user is an administrator', async () => {
        const mockUser = { id: 1, email: 'nils@gmail.com', name: 'Nils', role: 0 };
        User.get.mockReturnValue(mockUser);

        await checkRole('admin')(req, res, next);

        expect(next).toHaveBeenCalled();
    })
    it('should call next if user has the required permission', async () => {
        const mockUser = { id: 2, email: 'peter@gmail.com', name: 'Peter', role: 1 };
        User.get.mockResolvedValue(mockUser);

        const mockRole = { id: 1, name: 'author', perms: 'editContent,manageMenus,manageRoles' };
        Role.get.mockResolvedValue(mockRole);

        await checkRole('manageMenus')(req, res, next);

        expect(next).toHaveBeenCalled();
    });
    it('should render notAllowed template if user role could not be found', async () => {
        const mockUser = { id: 2, email: 'peter@gmail.com', name: 'Peter', role: 1 };
        User.get.mockResolvedValue(mockUser);
        Role.get.mockResolvedValue(null);

        await checkRole('manageMenus')(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.render).toHaveBeenCalledWith('notAllowed', {
            title: 'Not Allowed'
        })
    })
    it('should render notAllowed template if user does not have the required permission', async () => {
        const mockUser = { id: 2, email: 'peter@gmail.com', name: 'Peter', role: 1 };
        User.get.mockResolvedValue(mockUser);

        const mockRole = { id: 1, name: 'author', perms: 'editContent' };
        Role.get.mockResolvedValue(mockRole);

        await checkRole('manageMenus')(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.render).toHaveBeenCalledWith('notAllowed', {
            title: 'Not Allowed'
        })
    })
    it('should log error and redirect to login if there is an error', async () => {
        User.get.mockRejectedValue(new Error('Database error'));

        await checkRole('admin')(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/login');
        expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Database error',
        }))
        expect(next).not.toHaveBeenCalled();
    });
})