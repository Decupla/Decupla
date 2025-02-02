const useFormatDate = require('../useFormatDate');

jest.mock('../../helpers/formatDate');

describe('useFormatDate', () => {
  it('should add formatDate function to res.locals', () => {
    const req = {};
    const res = { locals: {} };
    const next = jest.fn();

    useFormatDate(req, res, next);

    expect(res.locals.formatDate).toBe(require('../../helpers/formatDate'));
    expect(next).toHaveBeenCalled();
  });
});