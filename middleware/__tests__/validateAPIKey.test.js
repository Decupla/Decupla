const Origin = require('../../models/origin');
const validateAPIKey = require('../validateAPIKey');

jest.mock('../../models/origin');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
};
const next = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

describe('validateAPIKey', () => {
    it('should send status 401 and error message if authorization header is missing', async () => {
        req.headers = {};

        await validateAPIKey(req,res,next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: 'Authorization header missing' });
    })
    it('should send status 401 and error message if token is missing', async () => {
        req.headers = {
            authorization: 'Bearer '
        };

        await validateAPIKey(req,res,next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: 'Authorization token missing' });
    })
    it('should send status 401 and error message if token does not start with bearer', async () => {
        req.headers = {
            authorization: 'Bear kQyDH901EkCxrvpmj9vIFsV7E7I4Eaik'
        };

        await validateAPIKey(req,res,next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: 'Authorization token missing' });
    })
    it('should send status 401 and error message if token is invalid', async () => {
        req.headers = {
            authorization: 'Bearer kQyDH901EkCxrvpmj9vIFsV7E7I4Eaik'
        };

        Origin.APIKeyValid.mockResolvedValue(false);

        await validateAPIKey(req,res,next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: 'Invalid Authorization Token' });
    })
    it('should call next if token is valid', async () => {
        req.headers = {
            authorization: 'Bearer kQyDH901EkCxrvpmj9vIFsV7E7I4Eaik'
        };

        Origin.APIKeyValid.mockResolvedValue(true);

        await validateAPIKey(req,res,next);

        expect(next).toHaveBeenCalled();
    })
})