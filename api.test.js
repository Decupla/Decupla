const request = require('supertest');
const app = require('./app');
const Content = require('./models/content');
const Block = require('./models/block');
const BlockInstance = require('./models/blockInstance');
const Menu = require('./models/menu');
const Origin = require('./models/origin');

jest.mock('./models/block');
jest.mock('./models/content');
jest.mock('./models/blockInstance');
jest.mock('./models/menu');
jest.mock('./models/origin');

const token = 'Bearer kQyDH901EkCxrvpmj9vIFsV7E7I4Eaik';

beforeEach(() => {
  Origin.APIKeyValid.mockReturnValue(true);
})

afterEach(() => {
  jest.clearAllMocks();
});

describe('GET /api/content/all', () => {
  it('should return a 200 status and the correct response', async () => {
    const mockedRows = [{ id: 1, title: "Test", status: 1, created: 17366898406, updated: 1736797021987 }];
    const mockedBlocks = [{ id: 1, blockID: 1, priority: 1, output: JSON.stringify({ "headline": "Hello World", "text": "Test" }) }];

    Content.getAllPublished.mockResolvedValue(mockedRows);
    BlockInstance.getByContent.mockResolvedValue(mockedBlocks);
    Block.getKey.mockResolvedValue('textblock');

    const response = await request(app).get('/api/content/all').set('Authorization', token);

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

    const response = await request(app).get('/api/content/1').set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  })

  it('should send status 404 and error message if no content was found', async () => {
    Content.get.mockResolvedValue(null);

    const response = await request(app).get('/api/content/1').set('Authorization', token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Content with ID 1 not found' });
  })
})

describe('GET /api/menus/all', () => {
  it('should return a 200 status and the correct response', async () => {
    const mockedRows = [{
      id: 1, title: "Main Navigation", key: "main-navigation", entries: JSON.stringify([
        { entryID: 1, contentID: 1, priority: 1, title: "Home" },
        { entryID: 2, contentID: 2, priority: 2, title: "About Us" }
      ])
    }]

    Menu.getAll.mockResolvedValue(mockedRows);

    const response = await request(app).get('/api/menus/all').set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedRows);
  })
})

describe('GET /api/menus/:id', () => {
  it('should return a 200 status and the correct response if menu was found', async () => {
    const mockedRow = {
      id: 1, title: "Main Navigation", key: "main-navigation", entries: JSON.stringify([
        { entryID: 1, contentID: 1, priority: 1, title: "Home" },
        { entryID: 2, contentID: 2, priority: 2, title: "About Us" }
      ])
    };

    Menu.get.mockResolvedValue(mockedRow);

    const response = await request(app).get('/api/menus/1').set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedRow);
  })

  it('should send status 404 and error message if no menu was found', async () => {
    Menu.get.mockResolvedValue(null);

    const response = await request(app).get('/api/menus/1').set('Authorization', token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Menu with ID 1 not found" });
  })
})

describe('GET /api/menus/:key', () => {
  it('should return a 200 status and the correct response if menu was found', async () => {
    const mockedRow = {
      id: 1, title: "Main Navigation", key: "main-navigation", entries: JSON.stringify([
        { entryID: 1, contentID: 1, priority: 1, title: "Home" },
        { entryID: 2, contentID: 2, priority: 2, title: "About Us" }
      ])
    };

    Menu.getByKey.mockResolvedValue(mockedRow);

    const response = await request(app).get('/api/menus/main-navigation').set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedRow);    
  })

  it('should send status 404 and error message if no menu was found', async () => {
    Menu.getByKey.mockResolvedValue(null);

    const response = await request(app).get('/api/menus/main-navigation').set('Authorization', token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Menu with Key 'main-navigation' not found" });
  })
})