const { index, add } = require('./contentController');
const Content = require('../models/content');

jest.mock('../models/content');

describe('index',()=>{
    it('should render content dashboard',()=>{
        const req = {};
        const res = {
            render: jest.fn()
        }
        Content.getAll.mockReturnValue([]);

        index(req, res);

        expect(res.render).toHaveBeenCalledWith('content', {
            title: 'Content'
        });
        expect(Content.getAll).toHaveBeenCalled();
    })
})

describe('add', () => {
    it('should call Contend.add',()=>{
        const req = {};
        const res = {};
        Content.add.mockImplementation(() => {});

        add(req, res);

        expect(Content.add).toHaveBeenCalled();
    })
})