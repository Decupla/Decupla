const collectionsController = require('../collectionsController');
const Validation = require('../../helpers/Validation');

jest.mock('../../helpers/Validation');

let req = {};
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
        req = {
            body: {
                title: 'Test Collection',
                key: ''
            }
        }

        Validation.prototype.validate = jest.fn();
        Validation.prototype.hasErrors = jest.fn(() => true);
        Validation.prototype.errors = { key: 'Key cannot be empty' };


        await collectionsController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            messages: { key: 'Key cannot be empty' },
            validation: false
        });
    })
})