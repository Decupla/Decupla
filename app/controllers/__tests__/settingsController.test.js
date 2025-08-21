const settingsController = require('../settingsController');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
};

describe('index', () => {
    it('should render settings template with correct parameters', () => {
        settingsController.index(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('settings', {
            title: 'Settings'
        });
    })
})