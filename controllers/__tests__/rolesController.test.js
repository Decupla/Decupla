const rolesController = require('../rolesController');
const Validation = require('../../helpers/Validation');
const Role = require('../../models/role');

jest.mock('../../models/role');

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
    it('should call Role.getAll and render roles template', async () => {
        const mockRows = [
            { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' },
            { id: 2, name: 'Redakteur', perms: 'editContent' }
        ]

        Role.getAll.mockReturnValue(mockRows);

        await rolesController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('roles', {
            title: 'Roles',
            roles: mockRows,
            query: req.query
        })
    })
})

describe('create', () => {
    it('should render editRole template', async () => {
        rolesController.create(req, res);

        expect(res.render).toHaveBeenCalledWith('editRole', {
            title: 'Create Role',
            query: req.query,
            data: {},
            rolePerms: [],
            editingExisting: false,
            messages: {}
        })
    })
})

describe('edit', () => {
    it('should call Role.get and render editRole template', async () => {
        req = {
            params: {
                id: 1
            }
        }

        const mockRow = { id: 1, name: 'Author', perms: 'editContent,editBlockInstances,manageMenus,manageRoles' };
        Role.get.mockReturnValue(mockRow);

        await rolesController.edit(req, res);

        expect(Role.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editRole', {
            title: 'Edit Role',
            data: mockRow,
            query: req.query,
            rolePerms: ['editContent', 'editBlockInstances', 'manageMenus', 'manageRoles'],
            editingExisting: true,
            messages: {}
        })
    })
    it('should redirect if Role.get returned null', async () => {
        req = {
            params: {
                id: 1
            }
        }

        Role.get.mockReturnValue(null);

        await rolesController.edit(req, res);

        expect(Role.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.redirect).toHaveBeenCalledWith('/roles')
    })
})

describe('saveNew', () => {
    it('should validate input and render template with errors', async () => {
        const req = {
            body: {
                permissions: 'manageBlocks'
            },
            query: {
            }
        }


        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { name: 'Name is required' }
                };
            });
        });

        await rolesController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editRole', {
            title: 'Create Role',
            query: req.query,
            data: req.body,
            rolePerms: req.body.permissions,
            editingExisting: false,
            messages: { name: 'Name is required' }
        });
    })
    it('should render template with error if req.body.permissions is undefined', async () => {
        const req = {
            body: {
                name: 'Author'
            }
        }

        await rolesController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editRole', {
            title: 'Create Role',
            query: req.query,
            data: req.body,
            rolePerms: [],
            editingExisting: false,
            messages: {perms: 'Please set at least one permission'}
        });
    })
    it('should call Role.add and redirect on success', async () => {
        const req = {
            body: {
                name: 'Author',
                permissions: 'editContent'
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        const mockNewID = 1
        Role.add.mockReturnValue(mockNewID);

        await rolesController.saveNew(req, res);

        expect(Role.add).toHaveBeenCalledWith({
            name: 'Author',
            perms: 'editContent'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith(`/roles/edit/${mockNewID}?message=saved`);
    })
    it('should render error template if Role.add returned null', async () => {
        const req = {
            body: {
                name: 'Author',
                permissions: 'editContent'
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Role.add.mockReturnValue(null);

        await rolesController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to save the role. Please check the console for more information.'
        });
    })
})

describe('save', () => {
    it('should validate input and send errors', async () => {
        const req = {
            body: {
                name: 'Author',
                permissions: ''
            },
            params: {
                id: 1
            }
        }


        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { perms: 'Perms is required' }
                };
            });
        });

        await rolesController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ perms: 'Perms is required' });
    })
    it('should call Role.update and redirect on success', async () => {
        const req = {
            body: {
                name: 'Author',
                permissions: 'editContent'
            },
            params: {
                id: 1
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Role.update.mockReturnValue(true);

        await rolesController.save(req, res);

        expect(Role.update).toHaveBeenCalledWith(1, {
            id: 1,
            name: 'Author',
            perms: 'editContent'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith('/roles/edit/1?message=saved');
    })
    it('should render error template if Role.updated failed', async () => {
        const req = {
            body: {
                name: 'Author',
                permissions: 'editContent'
            },
            params: {
                id: 1
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Role.update.mockReturnValue(false);

        await rolesController.save(req, res);

        expect(Role.update).toHaveBeenCalledWith(1, {
            id: 1,
            name: 'Author',
            perms: 'editContent'
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to update the role. Please check the console for more information.'
        });
    })
})

describe('remove', () => {
    it('should call Role.remove and redirect on success', async () => {
        req = {
            params: {
                id: 1
            }
        }

        Role.remove.mockReturnValue(true);

        await rolesController.remove(req, res);

        expect(Role.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith('/roles?message=deleted');
    })
    it('should render rror template if Role.delete failed', async () => {
        req = {
            params: {
                id: 1
            }
        }

        Role.remove.mockReturnValue(false);

        await rolesController.remove(req, res);

        expect(Role.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the role. Please check the console for more information.'
        })
    })
})