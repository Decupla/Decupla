const formatDate = require('../formatDate');
const dayjs = require('dayjs');

jest.mock('dayjs');

describe('formatDate',()=>{
    it('should format a valid timestamp to DD.MM.YYYY', () => {
        const mockFormattedDate = '18.01.2025';
        const mockDayjsInstance = { format: jest.fn(() => mockFormattedDate) };
        dayjs.mockImplementation(() => mockDayjsInstance);

        const timestamp = new Date('2025-01-18T12:00:00Z').getTime();
        expect(formatDate(timestamp)).toBe(mockFormattedDate);
        expect(dayjs).toHaveBeenCalledWith(timestamp);
        expect(mockDayjsInstance.format).toHaveBeenCalledWith('DD.MM.YYYY');
    })
    it('should handle invalid timestamps', () => {
        const mockFormattedDate = 'Invalid Date';
        const mockDayjsInstance = { format: jest.fn(() => mockFormattedDate) };
        dayjs.mockImplementation(() => mockDayjsInstance);

        const invalidTimestamp = 'invalid';
        expect(formatDate(invalidTimestamp)).toBe(mockFormattedDate);
        expect(dayjs).toHaveBeenCalledWith(invalidTimestamp);
        expect(mockDayjsInstance.format).toHaveBeenCalledWith('DD.MM.YYYY');
    })
})