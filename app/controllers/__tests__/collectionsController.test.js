const collectionsController = require('../collectionsController');
const Collection = require('../../models/collection');
const Validation = require('../../helpers/Validation');

jest.mock('../../helpers/Validation');
jest.mock('../../models/collection');

let req = {
    user: {
        tenantID: 1
    }
};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};

beforeEach(() => {
    Validation.mockClear();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('index', () => {
    it('should render collections template', async () => {

        await collectionsController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('collections', {
            title: 'Content',
            query: req.query
        });
    })
})

describe('create', () => {
    it('should render editCollection template', async () => {

        await collectionsController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editCollection', {
            title: 'Create Collection',
            data: {},
        });
    })
})

describe('saveNew', () => {
    it('should validate input and send errors', async () => {
        req.body = {
            title: 'Test Collection',
            key: ''
        }

        Validation.prototype.validate = jest.fn();
        Validation.prototype.hasErrors = jest.fn().mockReturnValue(true);
        Validation.prototype.errors = { key: 'Key cannot be empty' };


        await collectionsController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            messages: { key: 'Key cannot be empty' },
            validation: false
        });
    });
    it('should send errors if key is already in use', async () => {
        req.body = {
            title: 'Test Collection',
            key: 'test-collection'
        }

        Validation.prototype.validate = jest.fn();
        Validation.prototype.errors = {};

        Collection.keyExists.mockResolvedValue(true)

        await collectionsController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            messages: { key: 'Key already in use' },
            validation: false
        });
    });
    it('should save input and return new iD', async () => {
        req.body = {
            title: 'Test Collection',
            key: 'test-collection'
        }

        Validation.prototype.validate = jest.fn();
        Validation.prototype.errors = {}
        Validation.prototype.hasErrors = jest.fn().mockReturnValue(false);

        Collection.keyExists.mockReturnValue(false);
        Collection.add.mockResolvedValue(1);

        await collectionsController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            validation: true,
            newID: 1
        });
    })
    it('should send error if no newID was returned', async () => {
        req.body = {
            title: 'Test Collection',
            key: 'test-collection'
        }

        Validation.prototype.validate = jest.fn();
        Validation.prototype.errors = {}
        Validation.prototype.hasErrors = jest.fn().mockReturnValue(false);

        Collection.keyExists.mockReturnValue(false);
        Collection.add.mockResolvedValue(null);

        await collectionsController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            validation: true,
            messages: { error: 'Something went wrong while trying to save the collection. Please check the console for more information.' }
        });
    })
})

describe('save', () => {
    it('should validate input and send errors', async () => {
        req.body = {
            title: 'Test Collection Updated',
            key: ''
        };
        req.params = {
            id: 1
        };

        Validation.prototype.validate = jest.fn();
        Validation.prototype.hasErrors = jest.fn().mockReturnValue(true);
        Validation.prototype.errors = { key: 'Key cannot be empty' };


        await collectionsController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            messages: { key: 'Key cannot be empty' },
            validation: false
        });
    }),
        it('should send errors if new key is already in use', async () => {
            req.body = {
                title: 'Test Collection',
                key: 'test-collection',
            };
            req.params = {
                id: 1
            };

            Validation.prototype.validate = jest.fn();
            Validation.prototype.errors = {};

            Collection.keyChanged.mockResolvedValue(true)
            Collection.keyExists.mockResolvedValue(true)

            await collectionsController.save(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                messages: { key: 'Key already in use' },
                validation: false
            });
        });
    it('should call Collection.update after successfull validation and send response', async () => {
        req.body = {
            title: 'Test Collection Updated',
            key: 'test-collection-updated'
        };
        req.params = {
            id: 1
        };

        Validation.prototype.validate = jest.fn();
        Validation.prototype.errors = {};
        Validation.prototype.hasErrors = jest.fn().mockReturnValue(false);

        Collection.keyChanged.mockReturnValue(false);
        Collection.keyExists.mockReturnValue(false);
        Collection.update.mockResolvedValue(true);

        await collectionsController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            validation: true,
            success: true,
        });
    });
    it('should send error if Collection.update fails', async () => {
        req.body = {
            title: 'Test Collection Updated',
            key: 'test-collection-updated'
        };
        req.params = {
            id: 1
        };

        Validation.prototype.validate = jest.fn();
        Validation.prototype.hasErrors = jest.fn().mockReturnValue(false);

        Collection.keyChanged.mockReturnValue(false);
        Collection.keyExists.mockReturnValue(false);
        Collection.update.mockResolvedValue(false);

        await collectionsController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            validation: true,
            message: 'Something went wrong while trying to update the collection. Please check the console for more information.'
        });
    })
})

describe('remove', () => {
    req.params = {
        id: 1
    };

    it('should call Collection.remove and redirect on success', async () => {
        Collection.remove.mockReturnValue(true);

        await collectionsController.remove(req, res);

        expect(Collection.remove).toHaveBeenCalledWith(1);
        expect(res.redirect).toHaveBeenCalledWith('/collections?message=deleted');
    })

    it('should render error page if Collection.remove fails', async () => {
        Collection.remove.mockReturnValue(false);

        await collectionsController.remove(req, res);

        expect(Collection.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the collection. Please check the console for more information.'
        });
    })
})

describe('edit', () => {
    req.params = {
        id: 1
    };

    it('should call Collection.get and render edit template', async () => {
        const mockedRow = { id: 1, title: 'Found Collection', key: 'found-collection' };
        Collection.get.mockResolvedValue(mockedRow);

        await collectionsController.edit(req, res);

        expect(Collection.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editCollection', {
            title: 'Edit Collection',
            data: mockedRow,
            query: req.query,
        });
    })
    it('should redirect if Collection.get resolved null', async () => {
        Collection.get.mockResolvedValue(null);

        await collectionsController.edit(req, res);

        expect(res.redirect).toHaveBeenCalledWith('/collections');
    })
})