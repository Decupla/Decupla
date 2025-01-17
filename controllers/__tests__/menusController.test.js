const menusController = require('../menusController');
const Content = require('../../models/content');
const Menu = require('../../models/menu');
const Validation = require('../../helpers/Validation');

jest.mock('../../models/content');
jest.mock('../../models/menu');

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
    it('should call menu.getAll and render menus template', async () => {
        const mockRows = [
            { id: 1, title: 'Header Menu', key: 'header-menu', entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]' }
        ]
        Menu.getAll.mockReturnValue(mockRows)

        await menusController.index(req, res);

        expect(Menu.getAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('menus', {
            title: 'Menus',
            menus: mockRows,
            query: req.query
        })
    })
})

describe('create', () => {
    it('should call Content.getAllPublished and render editMenu template', async () => {
        const mockRows = [
            { id: 1, title: 'Home', status: 1 },
            { id: 2, title: 'About', status: 1 }
        ]

        Content.getAllPublished.mockReturnValue(mockRows)

        await menusController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editMenu', {
            title: 'Create Menu',
            data: {},
            content: mockRows
        })
    })
})

describe('edit', () => {
    req.params = {
        id: 1
    }

    const mockContentRows = [
        { id: 1, title: 'Home', status: 1 },
        { id: 2, title: 'About', status: 1 }
    ]

    it('should call Menu.get / Content.getAllPublished and render editMenu template', async () => {
        const mockMenuRow = { id: 1, title: 'Header Menu', key: 'header-menu', entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]' };

        Menu.get.mockReturnValue(mockMenuRow)
        Content.getAllPublished.mockReturnValue(mockContentRows)


        await menusController.edit(req, res);

        expect(Menu.get).toHaveBeenCalledWith(1);
        expect(Content.getAllPublished).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editMenu', {
            title: 'Edit Menu',
            data: mockMenuRow,
            query: req.query,
            content: mockContentRows
        });
    })
    it('should redirect if Menu.get returned null', async () => {
        Menu.get.mockReturnValue(null);
        Content.getAllPublished.mockReturnValue(mockContentRows)

        await menusController.edit(req, res);

        expect(Menu.get).toHaveBeenCalledWith(1);
        expect(Content.getAllPublished).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/menus')
    })
})

describe('saveNew', () => {
    it('should validate input and send errors', async () => {
        req.body = {
            title: 'Header Menu',
            key: 'header menu',
            entries: ''
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { key: 'Key cannot contain spaces' }
                };
            });
        });

        await menusController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            validation: false,
            messages: { key: 'Key cannot contain spaces' },
            success: false
        });
    })

    jest.mock('../../helpers/Validation', () => {
        return jest.fn().mockImplementation(() => {
            return {
                validate: jest.fn(),
                hasErrors: jest.fn().mockReturnValue(false),
                errors: {}
            };
        });
    });

    it('should send error if key already exists', async () => {
        req.body = {
            title: 'Header Menu',
            key: 'existingKey',
            entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]'
        }

        Menu.keyExists.mockReturnValue(true);

        await menusController.saveNew(req, res);

        expect(Menu.keyExists).toHaveBeenCalledWith('existingKey');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            validation: false,
            messages: { key: 'Key already in use' },
            success: false
        });
    })

    req.body = {
        title: 'Header Menu',
        key: 'headerMenu',
        entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]'
    }

    it('shoud call Menu.add after sucsessfull validation and return new id', async () => {
        Menu.keyExists.mockReturnValue(false);
        Menu.add.mockReturnValue(1);

        await menusController.saveNew(req, res);

        expect(Menu.add).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            validation: true,
            success: true,
            newID: 1
        })
    })

    it('should send error if Menu.add returned null', async () => {
        Menu.keyExists.mockReturnValue(false);
        Menu.add.mockReturnValue(null);

        await menusController.saveNew(req, res);

        expect(Menu.add).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            validation: true,
            success: false,
            message: 'Something went wrong while trying to save the menu. Please check the console for more information.'
        })
    })
})

describe('save', () => {
    it('should validate input and send errors', async () => {
        req = {
            body: {
                title: 'Header Menu',
                key: 'header menu',
                entries: ''
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
                    errors: { key: 'Key cannot contain spaces' }
                };
            });
        });

        await menusController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            validation: false,
            messages: { key: 'Key cannot contain spaces' },
            success: false
        });
    })

    jest.mock('../../helpers/Validation', () => {
        return jest.fn().mockImplementation(() => {
            return {
                validate: jest.fn(),
                hasErrors: jest.fn().mockReturnValue(false),
                errors: {}
            };
        });
    });

    it('should send error if key was changed and new key already exists', async () => {
        req = {
            body: {
                title: 'Header Menu',
                key: 'existingKey',
                entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]'
            },
            params: {
                id: 1
            }
        }

        Menu.keyChanged.mockReturnValue(true);
        Menu.keyExists.mockReturnValue(true);

        await menusController.save(req, res);

        expect(Menu.keyChanged).toHaveBeenCalledWith(1, 'existingKey');
        expect(Menu.keyExists).toHaveBeenCalledWith('existingKey');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            validation: false,
            messages: { key: 'Key already in use' },
            success: false
        });
    })

    it('shoud call Block.add after successfull validation and send response', async () => {
        req = {
            body: {
                title: 'Header Menu',
                key: 'headerMenu',
                entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]',
                id: 1
            },
            params: {
                id: 1
            }
        }

        Menu.keyChanged.mockReturnValue(true);
        Menu.keyExists.mockReturnValue(false);
        Menu.update.mockReturnValue(true);

        await menusController.save(req, res);

        expect(Menu.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ success: true, validation: true });
    })

    it('should send error if Block.add failed', async () => {
        req = {
            body: {
                title: 'Header Menu',
                key: 'headerMenu',
                entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]',
                id: 1
            },
            params: {
                id: 1
            }
        }

        Menu.keyChanged.mockReturnValue(true);
        Menu.keyExists.mockReturnValue(false);
        Menu.update.mockReturnValue(false);

        await menusController.save(req, res);

        expect(Menu.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            validation: true,
            message: 'Something went wrong while trying to update the menu. Please check the console for more information.'
        });
    })
})

describe('get', () => {
    req = {
        params: {
            id: 1
        }
    };

    it('should call Menu.get and return result', async () => {
        const mockMenuRow = { id: 1, title: 'Header Menu', key: 'header-menu', entries: '[{"entryID":1,"contentID":"1","priority":1,"title":"Home"}]' };

        Menu.get.mockReturnValue(mockMenuRow);

        await menusController.get(req, res);

        expect(Menu.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            menu: mockMenuRow
        });
    })

    it('should send error if Menu.get returned null', async () => {
        Menu.get.mockReturnValue(null);

        await menusController.get(req, res);

        expect(Menu.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Something went wrong while trying to get the menu. Please check the console for more information.'
        });
    })
})

describe('remove',()=>{
    req = {
        params: {
            id: 1
        }
    };

    it('should call Menu.remove and redirect on success',async () => {
        Menu.remove.mockReturnValue(true);

        await menusController.remove(req,res);

        expect(Menu.remove).toHaveBeenCalledWith(1);
        expect(res.redirect).toHaveBeenCalledWith('/menus?message=deleted');
    })

    it('should render error page if Menu.remove failed',async () => {
        Menu.remove.mockReturnValue(false);

        await menusController.remove(req,res);

        expect(Menu.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the menu. Please check the console for more information.'
        });
    })
})