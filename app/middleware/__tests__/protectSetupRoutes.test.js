const protectSetupRoutes = require('../protectSetupRoutes');

const res = { redirect: jest.fn() };
const next = jest.fn();

describe('protectSetupRoutes',()=>{
    it('should redirect to / if session.allowSetup is false',()=>{
        const req = { session: { allowSetup: false } };

        protectSetupRoutes(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/');
    });
    it('should redirect to / if session.allowSetup is not set',()=>{
        const req = { session: {} };

        protectSetupRoutes(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith('/');
    });
    it('should call next if session.allowSetup is true',()=>{
        const req = { session: { allowSetup: true } };
        
        protectSetupRoutes(req, res, next);

        expect(next).toHaveBeenCalled();
    });
})