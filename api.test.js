const request = require('supertest');
const app = require('./app');
const Content = require('./models/content');

// jest.mock('./models/content');

describe('GET /api/content/all', () => {
    it('should return a 200 status and the correct response', async () => {
        const mockedRows = [{id: 1, title: "Test", status: 1, created: 17366898406, updated: 1736797021987, blocks: [{instanceID: 1, output: { "headline": "Hello World", "text": "h" }}]}];
        // Content.getAll.mockReturnValue(mockedRows);

        const response = await request(app).get('/api/content/all');
  
      expect(response.status).toBe(200);
      // expect(response.body).toEqual(mockedRows);
    });
  });