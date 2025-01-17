const invalidRouteHandler = require('../invalidRouteHandler');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    redirect: jest.fn(),
};
const next = jest.fn();

describe('indvalidRouteHandler', () => {
    it('should redirect to /content', async () => {
        invalidRouteHandler(req,res,next);
        
        expect(res.redirect).toHaveBeenCalledWith('/content');
    })
})