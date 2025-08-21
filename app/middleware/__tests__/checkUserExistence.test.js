const checkUserExistence = require('../checkUserExistence');
const User = require('../../models/user');

jest.mock('../../models/user');

const req = { session: {} };
const res = { 
  redirect: jest.fn(), 
  status: jest.fn()
};
const next = jest.fn();

describe('checkUserExistence', () => {
  it('should call User.getAll and redirect to /setup if no rows were found', async () => {
    User.getAll.mockResolvedValue([]); 

    await checkUserExistence(req, res, next);

    expect(req.session.allowSetup).toBe(true);
    expect(res.redirect).toHaveBeenCalledWith('/setup');
  });

  it('should call next if rows exist', async () => {
    const mockRows = [{ id: 1, email: 'nils@gmail.com', name: 'Nils', password: "$hashedPassword",role:1}];
    User.getAll.mockResolvedValue(mockRows); 

    await checkUserExistence(req, res, next);

    expect(req.session.allowSetup).toBe(false);
    expect(next).toHaveBeenCalled(); 
  });

  it('should log errors and redirect to /setup', async () => {
    User.getAll.mockRejectedValue(new Error('Database error')); 

    await checkUserExistence(req, res, next);

    expect(req.session.allowSetup).toBe(true);
    expect(res.redirect).toHaveBeenCalledWith('/setup');
  });
});