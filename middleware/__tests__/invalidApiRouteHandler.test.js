const invalidApiRouteHandler = require('../invalidApiRouteHandler');

const res = { 
    status: jest.fn().mockReturnThis(), 
    send: jest.fn() 
  };

describe('invalidApiRouteHandler', () => {
  it('should send status 404 and error message', () => {
    const req = { path: '/invalid-api-route' };

    invalidApiRouteHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("'/invalid-api-route' is not a valid API-Route. Check the documentation to see all valid API-Routes."); 
  });
});