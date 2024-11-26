const { index, add } = require('./contentController');
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

describe('add', () => {
    it('should call Contend.add',()=>{
        const req = {};
        const res = {};
        Content.add.mockImplementation(() => {});

        add(req, res);

        expect(Content.add).toHaveBeenCalled();
    })
})