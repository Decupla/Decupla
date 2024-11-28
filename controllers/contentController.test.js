const { index, create } = require('./contentController');
const Content = require('../models/content');

jest.mock('../models/content');

describe('index',()=>{
    it('should render content dashboard',async ()=>{
        const req = {};
        const res = {
            render: jest.fn()
        }
        Content.getAll.mockReturnValue([]);

        const content = await Content.getAll();

        await index(req, res);

        expect(res.render).toHaveBeenCalledWith('content', {
            title: 'Content',
            content
        });
        expect(Content.getAll).toHaveBeenCalled();
    })
})