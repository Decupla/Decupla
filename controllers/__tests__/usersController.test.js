const usersController = require('../usersController');
const User = require('../../models/user');
const Role = require('../../models/role');
const Validation = require('../../helpers/Validation');
const bcrypt = require('bcrypt');

jest.mock('../../models/user');
jest.mock('../../models/role');
jest.mock('bcrypt');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('index', () => {
    it('should call User.getAll and render users template', async () => {
        const mockRows = [
            { id: 1, email: 'nils@gmail.com', name: 'Nils', password: 'login123', role: 0 },
            { id: 2, email: 'peter@gmail.com', name: 'Peter', password: 'loginpeter', role: 1 }
        ]
        const mockRoleRow = { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' };

        User.getAll.mockReturnValue(mockRows);
        Role.get.mockReturnValue(mockRoleRow);

        await usersController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('users', {
            title: 'Users',
            users: mockRows,
            query: req.query
        })

    })
})

describe('create', () => {
    it('shoud call Role.getAll and render editUser template', async () => {
        const mockRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        Role.getAll.mockReturnValue(mockRows);

        await usersController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editUser', {
            title: 'Create User',
            data: {},
            messages: {},
            editingExisting: false,
            query: req.query,
            roles: mockRows,
        })

    })
})

describe('edit', () => {
    it('should call Role.getAll and User.get and should render editUser templates with roles and user data', async () => {
        req = {
            params: {
                id: 1
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]
        const mockUserRow = { id: 1, email: 'nils@gmail.com', name: 'Nils', password: 'login123' };

        Role.getAll.mockReturnValue(mockRoleRows);
        User.get.mockReturnValue(mockUserRow);

        await usersController.edit(req, res);

        expect(User.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editUser', {
            title: 'Edit User',
            data: { id: 1, email: 'nils@gmail.com', name: 'Nils', password: '' },
            query: req.query,
            messages: {},
            editingExisting: true,
            query: req.query,
            roles: mockRoleRows
        })
    })

    it('should redirect if User.get returned null', async () => {
        req = {
            params: {
                id: 1
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        Role.getAll.mockReturnValue(mockRoleRows);
        User.get.mockReturnValue(null);

        await usersController.edit(req, res);

        expect(User.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.redirect).toHaveBeenCalledWith('/users');
    })
})

describe('save new', () => {
    it('should validate input and render editUser template with error messages', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                password: 'loginsven',
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        Role.getAll.mockReturnValue(mockRoleRows);

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { name: 'Name is required', role: 'Role is required' }
                };
            });
        });

        await usersController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editUser', {
            title: 'Create User',
            data: req.body,
            messages: { name: 'Name is required', role: 'Role is required' },
            editingExisting: false,
            query: req.query,
            roles: mockRoleRows
        })
    })
    it('should use User.mailExists to check if user mail is already in use', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                password: 'loginsven',
                role: 1
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        Role.getAll.mockReturnValue(mockRoleRows);
        User.mailExists.mockReturnValue(true);

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        await usersController.saveNew(req, res);

        expect(User.mailExists).toHaveBeenCalledWith('sven@gmail.com');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editUser', {
            title: 'Create User',
            data: req.body,
            messages: { email: 'Mail already in use' },
            editingExisting: false,
            query: req.query,
            roles: mockRoleRows
        })
    })
    it('should hash password, call User.add and redirect on success', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                password: 'loginsven',
                role: 1
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        const mockNewID = 3;

        Role.getAll.mockReturnValue(mockRoleRows);
        User.mailExists.mockReturnValue(false);
        bcrypt.hash.mockReturnValue('hashedpassword');
        User.add.mockReturnValue(mockNewID);



        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        await usersController.saveNew(req, res);

        expect(User.mailExists).toHaveBeenCalledWith('sven@gmail.com');
        expect(bcrypt.hash).toHaveBeenCalledWith('loginsven', 10);
        expect(User.add).toHaveBeenCalledWith({
            email: 'sven@gmail.com',
            name: 'Sven',
            password: 'hashedpassword',
            role: 1
        })

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith(`/users/edit/${mockNewID}?message=saved`)
    })
    it('should render error template of User.add returned null', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                password: 'loginsven',
                role: 1
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        const mockNewID = 3;

        Role.getAll.mockReturnValue(mockRoleRows);
        User.mailExists.mockReturnValue(false);
        bcrypt.hash.mockReturnValue('hashedpassword');
        User.add.mockReturnValue(null);



        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        await usersController.saveNew(req, res);

        expect(User.mailExists).toHaveBeenCalledWith('sven@gmail.com');
        expect(bcrypt.hash).toHaveBeenCalledWith('loginsven', 10);
        expect(User.add).toHaveBeenCalledWith({
            email: 'sven@gmail.com',
            name: 'Sven',
            password: 'hashedpassword',
            role: 1
        })

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to save the user. Please check the console for more information.'
        })
    })
})

describe('save', () => {
    it('should validate input and render editUser template with error messages', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                id: 3
            },
            params: {
                id: 3
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        Role.getAll.mockReturnValue(mockRoleRows);

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { name: 'Name is required', role: 'Role is required' }
                };
            });
        });

        await usersController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editUser', {
            title: 'Edit User',
            data: req.body,
            messages: { name: 'Name is required', role: 'Role is required' },
            editingExisting: true,
            query: req.query,
            roles: mockRoleRows
        })
    })
    it('should check if email was changed and if so, check if new email is already in use', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                role: 1,
                id: 3,
            },
            params: {
                id: 3
            }
        }

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        Role.getAll.mockReturnValue(mockRoleRows);
        User.emailChanged.mockReturnValue(true);
        User.mailExists.mockReturnValue(true);

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        await usersController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editUser', {
            title: 'Edit User',
            data: req.body,
            messages: { email: 'Mail already in use' },
            editingExisting: true,
            query: req.query,
            roles: mockRoleRows
        })
    })
    it('should validate new password if a new password was set', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                newPassword: '123',
                role: 1,
                id: 3
            },
            params: {
                id: 3
            },
        };

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ];

        Role.getAll.mockReturnValue(mockRoleRows);
        User.emailChanged.mockReturnValue(false);

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn((field, rules) => {
                        if (field === 'password' && rules.includes('min:8')) {
                            throw new Error('Password has to be at least 8 characters long');
                        }
                    }),
                    hasErrors: jest.fn(() => true),
                    errors: { password: 'Password has to be at least 8 characters long' }
                };
            });
        });

        await usersController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editUser', {
            title: 'Edit User',
            data: {
                email: 'sven@gmail.com',
                name: 'Sven',
                password: '123',
                role: 1,
                id: 3
            },
            messages: { password: 'Password has to be at least 8 characters long' },
            editingExisting: true,
            query: req.query,
            roles: mockRoleRows
        });
    });
    it('should hash new password, call User.update and redirect on success', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                newPassword: 'loginsven123',
                role: 1,
                id: 3
            },
            params: {
                id: 3
            },
        };

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ];

        Role.getAll.mockReturnValue(mockRoleRows);
        User.emailChanged.mockReturnValue(false);
        User.update.mockReturnValue(true);
        bcrypt.hash.mockReturnValue('hashedpassword');

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        await usersController.save(req, res);

        expect(User.update).toHaveBeenCalledWith(3, {
            email: 'sven@gmail.com',
            name: 'Sven',
            password: 'hashedpassword',
            role: 1,
            id: 3
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith('/users/edit/3?message=saved');
    })
    it('should not hash password if newPasswordSet is false', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                newPassword: '',
                role: 1,
                id: 3
            },
            params: {
                id: 3
            },
        };
    
        await usersController.save(req, res);
    
        expect(bcrypt.hash).not.toHaveBeenCalled();
        expect(User.update).toHaveBeenCalledWith(3, {
            email: 'sven@gmail.com',
            name: 'Sven',
            role: 1,
            id: 3
        });
    });
    
    it('should render error template if User.update failed', async () => {
        req = {
            body: {
                email: 'sven@gmail.com',
                name: 'Sven',
                newPassword: 'loginsven123',
                role: 1,
                id: 3
            },
            params: {
                id: 3
            },
        };

        const mockRoleRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ];

        Role.getAll.mockReturnValue(mockRoleRows);
        User.emailChanged.mockReturnValue(false);
        User.update.mockReturnValue(false);
        bcrypt.hash.mockReturnValue('hashedpassword');

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        await usersController.save(req, res);

        expect(User.update).toHaveBeenCalledWith(3, {
            email: 'sven@gmail.com',
            name: 'Sven',
            password: 'hashedpassword',
            role: 1,
            id: 3
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to update the user. Please check the console for more information.'
        });
    })
})

describe('remove', () => {
    it('should call User.remove and redirect on success', async () => {
        req = {
            params: {
                id: 1
            }
        }

        User.remove.mockReturnValue(true);

        await usersController.remove(req,res);

        expect(User.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith('/users?message=deleted');
    })
    it('should render error template if User.remove failed', async () => {
        req = {
            params: {
                id: 1
            }
        }

        User.remove.mockReturnValue(false);

        await usersController.remove(req,res);

        expect(User.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error',{
            title: 'Error',
            message: 'Something went wrong while trying to delete the user. Please check the console for more information.'
        });
    })
})