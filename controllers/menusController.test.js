const menusController = require('./menusController');
const Content = require('../models/content');

jest.mock('../models/content');

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
    it('should render menus template', () => {
        menusController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('menus', {
            title: 'Menus',
            query: req.query
        })
    })
})

describe('create', () => {
    it('should call Content.getAll and render editMenu template', async () => {
        const mockRows = [
            {id: 1, title: 'Home', status: 1},
            {id: 2, title: 'About', status: 1}
        ]

        Content.getAll.mockReturnValue(mockRows)

        await menusController.create(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editMenu', {
        title: 'Create Menu',
        data: {},
        content: mockRows
    })
    })
})