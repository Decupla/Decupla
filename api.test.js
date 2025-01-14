const request = require('supertest');
const app = require('./app');
const Content = require('./models/content');
const Block = require('./models/block');
const BlockInstance = require('./models/blockInstance');
const Menu = require('./models/menu');

jest.mock('./models/block');
jest.mock('./models/content');
jest.mock('./models/blockInstance');
jest.mock('./models/menu');

describe('GET /api/content/all', () => {
  it('should return a 200 status and the correct response', async () => {
    const mockedRows = [{ id: 1, title: "Test", status: 1, created: 17366898406, updated: 1736797021987 }];
    const mockedBlocks = [{ id: 1, blockID: 1, priority: 1, output: JSON.stringify({ "headline": "Hello World", "text": "Test" }) }];

    Content.getAllPublished.mockResolvedValue(mockedRows);
    BlockInstance.getByContent.mockResolvedValue(mockedBlocks);
    Block.getKey.mockResolvedValue('textblock');

    const response = await request(app).get('/api/content/all');

    const expectedResponse = [
      {
        id: 1, title: "Test", status: 1, created: 17366898406, updated: 1736797021987, blocks: [
          {
            instanceID: 1,
            blockID: 1,
            blockKey: 'textblock',
            priority: 1,
            output: { "headline": "Hello World", "text": "Test" }
          }
        ]
      }
    ];


    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });
});

describe('GET /api/content/:id', () => {
  it('should return a 200 status and the correct response if content was found', async () => {
    const mockedRows = { id: 1, title: "Test", status: 1, created: 17366898406, updated: 1736797021987 };
    const mockedBlocks = [{ id: 1, blockID: 1, priority: 1, output: JSON.stringify({ "headline": "Hello World", "text": "Test" }) }];

    Content.get.mockResolvedValue(mockedRows);
    BlockInstance.getByContent.mockResolvedValue(mockedBlocks);
    Block.getKey.mockResolvedValue('textblock');

    const expectedResponse = {
      id: 1, title: "Test", status: 1, created: 17366898406, updated: 1736797021987, blocks: [
        {
          instanceID: 1,
          blockID: 1,
          blockKey: 'textblock',
          priority: 1,
          output: { "headline": "Hello World", "text": "Test" }
        }
      ]
    }

    const response = await request(app).get('/api/content/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  })

  it('should send status 404 and error message if no content was found', async () => {
    Content.get.mockResolvedValue(null);

    const response = await request(app).get('/api/content/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Content with ID 1 not found' });
  })
})

describe('getAllMenus', () => {
  it('should return a 200 status and the correct response', async () => {
    const mockedRows = [{
      id: 1, title: "Main Navigation", key: "main-navigation", entries: JSON.stringify([
        { entryID: 1, contentID: 1, priority: 1, title: "Home" },
        { entryID: 2, contentID: 2, priority: 2, title: "About Us" }
      ])
    }]

    Menu.getAll.mockResolvedValue(mockedRows);

    const response = await request(app).get('/api/menus/all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedRows);
  })
})