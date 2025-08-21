const apiKeysController = require('../apiKeysController');
const APIKey = require('../../models/APIKey');
const Validation = require('../../helpers/Validation');

jest.mock('../../models/APIKey');
jest.mock('../../helpers/Validation');

let req = {}
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
};

afterEach(() => {
    jest.clearAllMocks();
});


describe('index', () => {
    it('shoud call APIKey.getAll and render apiKeys template with rows', async () => {
        const mockRows = [{ id: 1, name: 'mockedKey', key: '5pMHnfQPQwGNj5v3kkoWnzAHkBPJW7vN' }];
        APIKey.getAll.mockResolvedValue(mockRows);

        await apiKeysController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('apiKeys', {
            title: 'API-Keys',
            keys: mockRows,
            query: req.query
        })
    })
})

describe('create', () => {
    it('should render editKey template', async () => {
        apiKeysController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editKey', {
            title: 'Create New API-Key',
            query: req.query,
            editingExisting: false,
            data: {},
            messages: {}
        });
    })
})

describe('edit', () => {
    it('should call APIKey.get and render editKey template', async () => {
        req.params = { id: 1 }

        const mockRow = { id: 1, name: 'mockedKey', key: '5pMHnfQPQwGNj5v3kkoWnzAHkBPJW7vN' };
        APIKey.get.mockResolvedValue(mockRow);

        await apiKeysController.edit(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editKey', {
            title: 'Edit API-Key',
            query: req.query,
            editingExisting: true,
            data: mockRow,
            messages: {}
        })
    });
    it('shoud redirect to /api-keys if APIKey.get returned null', async () => {
        req.params = { id: 1 }
        APIKey.get.mockResolvedValue(null);

        await apiKeysController.edit(req, res);

        expect(res.redirect).toHaveBeenCalledWith('/api-keys');
    });
})

describe('saveNew', () => {
    beforeEach(() => {
        req = {
            body: { name: 'newMockedKey', key: '5pMHnfQPQwGNj5v3kkoWnzAHkBPJW7vN' },
            params: { id: '1' }
        };
    });

    it('should validate input and render editKey template with errors', async () => {
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(true),
            errors: { name: 'Name is required' }
        }));

        await apiKeysController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editKey', {
            title: 'Create New API-Key',
            query: req.query,
            editingExisting: false,
            data: req.body,
            messages: { name: 'Name is required' }
        });
    });
    it('should save a new API key and redirect', async () => {
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(false),
            errors: {}
        }));
        APIKey.add.mockResolvedValue(1);

        await apiKeysController.saveNew(req, res);

        expect(APIKey.add).toHaveBeenCalledWith(req.body);
        expect(res.redirect).toHaveBeenCalledWith('/settings/api-keys/edit/1?message=saved');
    });
    it('should render error template if APIKey.add returned null', async () => {
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(false),
            errors: {}
        }));
        APIKey.add.mockResolvedValue(null);

        await apiKeysController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to save the API-Key. Please check the console for more information.'
        });
    })
})

describe('save', () => {
    beforeEach(() => {
        req = {
            body: { name: 'editedMockedKey', key: '5pMHnfQPQwGNj5v3kkoWnzAHkBPJW7vN' },
            params: { id: 1 }
        };
    });

    it('should validate input and render editKey template with errors', async () => {
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(true),
            errors: { name: 'Name is required' }
        }));

        await apiKeysController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editKey', {
            title: 'Edit API-Key',
            query: req.query,
            editingExisting: true,
            data: { id: 1, ...req.body },
            messages: { name: 'Name is required' }
        });
    });
    it('should call APIKey.update and redirect on success', async () => {
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(false),
            errors: {}
        }));
        APIKey.update.mockResolvedValue(true);

        await apiKeysController.save(req, res);

        expect(APIKey.update).toHaveBeenCalledWith(1, { id: 1, ...req.body });
        expect(res.redirect).toHaveBeenCalledWith('/settings/api-keys/edit/1?message=saved');
    });
    it('should render Error template if APIKey.update failed', async () => {
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(false),
            errors: {}
        }));
        APIKey.update.mockResolvedValue(false);

        await apiKeysController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to save the API-Key. Please check the console for more information.'
        });
    })
})

describe('remove', () => {
    beforeEach(() => {
        req.params = { id: 1 };
    });

    it('should call APIKey.remove and redirect on success', async () => {
        APIKey.remove.mockResolvedValue(true);

        await apiKeysController.remove(req, res);

        expect(APIKey.remove).toHaveBeenCalledWith(1);
        expect(res.redirect).toHaveBeenCalledWith('/settings/api-keys?message=deleted');
    });
    it('should render error template if APIKey.remove failed', async () => {
        APIKey.remove.mockResolvedValue(false);

        await apiKeysController.remove(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the API-Key. Please check the console for more information.'
        });
    })
})