const contentController = require('../contentController');
const Validation = require('../../helpers/Validation');
const Content = require('../../models/content');
const Block = require('../../models/block');
const BlockInstance = require('../../models/blockInstance');
const processUrl = require('../../helpers/processUrl');
const { validate } = require('webpack');

jest.mock('../../models/content');
jest.mock('../../models/block');
jest.mock('../../models/blockInstance');
jest.mock('../../helpers/processUrl');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};

beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 123456789);

    processUrl.mockImplementation((data) => {
        data.url = 'test-content'
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('index', () => {
    it('should get all content and render content template', async () => {
        const mockContent = [
            { id: 1, title: 'Home', status: 1 },
            { id: 2, title: 'Status', status: 1 },
        ]

        Content.getAll.mockReturnValue(mockContent);

        await contentController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('content', {
            title: 'Content',
            content: mockContent,
            query: req.query
        });
    })
})

describe('create', () => {
    it('should get all blocks and render editContent template', async () => {
        const mockBlocks = [
            { id: 1, title: 'Block 1', status: 1 },
            { id: 2, title: 'Block 2', status: 1 },
        ];

        Block.getAll.mockReturnValue(mockBlocks);

        await contentController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editContent', {
            title: 'Create Content',
            blocks: mockBlocks,
            data: {},
        })
    })
})

describe('edit', () => {
    it('should get all blocks and existing content and render editContent template', async () => {
        req = {
            params: {
                id: 1
            }
        }

        const mockBlocks = [
            { id: 1, title: 'Block 1', status: 1 },
            { id: 2, title: 'Block 2', status: 1 },
        ];

        const mockContent = { id: 1, title: 'Home', status: 1 };

        Block.getAll.mockReturnValue(mockBlocks);
        Content.get.mockReturnValue(mockContent);

        await contentController.edit(req, res);

        expect(Content.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.render).toHaveBeenCalledWith('editContent', {
            title: 'Edit Content',
            data: mockContent,
            blocks: mockBlocks,
            query: req.query,
        })
    });

    it('should redirect if Content.get returned null', async () => {
        req = {
            params: {
                id: 90
            }
        }

        const mockBlocks = [
            { id: 1, title: 'Block 1', status: 1 },
            { id: 2, title: 'Block 2', status: 1 },
        ];

        Block.getAll.mockReturnValue(mockBlocks);
        Content.get.mockReturnValue(null);

        await contentController.edit(req, res);

        expect(Content.get).toHaveBeenCalledWith(90);
        expect(res.redirect).toHaveBeenCalledWith('/content');

    })
})

describe('saveNew', () => {
    it('should validate input and send errors', async () => {
        req = {
            body: {
                title: 'Test Content',
                url: ''
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { status: 'Status is required' }
                };
            });
        });

        await contentController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            messages: { status: 'Status is required' },
            url: 'test-content',
            validation: false
        });

    })
    it('shoud call Content.add after sucsessfull validation and send new id', async () => {
        req = {
            body: {
                title: 'New Content',
                status: 1
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        const mockNewID = 1;
        Content.add.mockReturnValue(mockNewID);

        await contentController.saveNew(req, res);

        expect(Content.add).toHaveBeenCalledWith({
            title: 'New Content',
            status: 1,
            created: 123456789,
            url: 'test-content'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            validation: true,
            newID: mockNewID,
            url: 'test-content'
        })
    })
    it('should send status 500 if saving content fails', async () => {
        req = {
            body: {
                title: 'New Content',
                status: 1
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Content.add.mockReturnValue(null);

        await contentController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            validation: true,
            messages: { error: 'Something went wrong while trying to save the content. Please check the console for more information.' }
        })
    })
})

describe('save', () => {
    it('should validate input and send errors', async () => {
        req = {
            params: {
                id: 1
            },
            body: {
                title: 'Test Content',
                id: 1,
                url: ''
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { status: 'Status is required' }
                };
            });
        });

        await contentController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            messages: { status: 'Status is required' },
            url: 'test-content',
            validation: false
        });
    })
    it('shoud call Content.update after sucsessfull validation and send success', async () => {
        req = {
            params: {
                id: 1
            },
            body: {
                title: 'Existing Content',
                status: 1,
                id: 1,
                url: ''
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Content.update.mockReturnValue(true);

        await contentController.save(req, res)

        expect(Content.update).toHaveBeenCalledWith(1, {
            id: 1,
            title: 'Existing Content',
            status: 1,
            updated: 123456789,
            url: 'test-content'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            validation: true,
            url: 'test-content'
        })
    })
    it('should send status 500 if saving content fails', async () => {
        req = {
            params: {
                id: 1
            },
            body: {
                title: 'Existing Content',
                status: 1,
                id: 1,
                url: ''
            }
        }

        jest.mock('../../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Content.update.mockReturnValue(false);

        await contentController.save(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            validation: true,
            messages: { error: 'Something went wrong while trying to update the content. Please check the console for more information.' }
        })
    })
})

describe('remove', () => {
    it('should call Content.remove and BlockInstance.deleteByContent with correct parameters and redirect afterwards', async () => {
        req = {
            params: {
                id: 1
            }
        }

        Content.remove.mockReturnValue(true);
        BlockInstance.deleteByContent.mockReturnValue(true);

        await contentController.remove(req, res);

        expect(Content.remove).toHaveBeenCalledWith(1);
        expect(BlockInstance.deleteByContent).toHaveBeenCalledWith(1);
        expect(res.redirect).toHaveBeenCalledWith('/content?message=deleted');
    })
    it('should render error page if Content.remove failed', async () => {
        req = {
            params: {
                id: 90
            }
        }

        Content.remove.mockReturnValue(false);

        await contentController.remove(req, res);

        expect(Content.remove).toHaveBeenCalledWith(90);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the content. Please check the console for more information.'
        })
    })
    it('should render error page if BlockInstance.delteByContent failed', async () => {
        req = {
            params: {
                id: 90
            }
        }

        Content.remove.mockReturnValue(true);
        BlockInstance.deleteByContent.mockReturnValue(false);

        await contentController.remove(req, res);

        expect(BlockInstance.deleteByContent).toHaveBeenCalledWith(90);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the block instances. Please check the console for more information.'
        })

    })
})

describe('getBlocks', () => {
    it('should call BlockInstance.getByContent, get the block Title of each instance by calling Block.get and send block instances', async () => {
        req = {
            params: {
                id: 1
            }
        }

        const mockInstanceRows = [
            { id: 1, blockID: 2, contentID: 1, output: 'Text: Hallo Welt' },
            { id: 2, blockID: 2, contentID: 1, output: 'Text: Lorem Ipsum' }
        ]
        const mockBlockRow = { id: 1, title: 'Textblock', status: 1 }
        BlockInstance.getByContent.mockReturnValue(mockInstanceRows);
        Block.get.mockReturnValue(mockBlockRow);

        await contentController.getBlocks(req, res);

        expect(BlockInstance.getByContent).toHaveBeenCalledWith(1);
        expect(Block.get).toHaveBeenCalledWith(2);
        expect(Block.get).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            blocks: [
                { id: 1, blockID: 2, contentID: 1, output: 'Text: Hallo Welt', title: 'Textblock' },
                { id: 2, blockID: 2, contentID: 1, output: 'Text: Lorem Ipsum', title: 'Textblock' }
            ]
        })
    })
    it('should send error if BlockInstance.getByContent returned null', async () => {
        req = {
            params: {
                id: 1
            }
        }

        BlockInstance.getByContent.mockReturnValue(null);

        await contentController.getBlocks(req, res);

        expect(BlockInstance.getByContent).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Something went wrong while trying to get the block. Please check the console for more information.'
        })
    })
    it('should send error if Block.get returned null', async () => {
        req = {
            params: {
                id: 1
            }
        }

        const mockInstanceRows = [
            { id: 1, blockID: 2, contentID: 1, output: 'Text: Hallo Welt' },
            { id: 2, blockID: 2, contentID: 1, output: 'Text: Lorem Ipsum' }
        ]
        BlockInstance.getByContent.mockReturnValue(mockInstanceRows);
        Block.get.mockReturnValue(null);

        await contentController.getBlocks(req, res);

        expect(BlockInstance.getByContent).toHaveBeenCalledWith(1);
        expect(Block.get).toHaveBeenCalledWith(2);
        expect(Block.get).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Block for BlockInstance not found.'
        })
    })
})