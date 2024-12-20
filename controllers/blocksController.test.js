const blocksController = require('./blocksController');
const Block = require('../models/block');
const BlockInstance = require('../models/blockInstance');
const Validation = require('../helpers/Validation');

jest.mock('../models/block');
jest.mock('../models/blockInstance');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};
// let renderSpy;
// let statusSpy;

// beforeEach(() => {
//     renderSpy = jest.spyOn(res, 'render').mockImplementation();
//     statusSpy = jest.spyOn(res, 'status').mockImplementation(() => res);
//     redirectSpy = jest.spyOn(res, 'redirect').mockImplementation();
// });

afterEach(() => {
    jest.clearAllMocks();
    // renderSpy.mockRestore();
    // statusSpy.mockRestore();
});

describe('index', () => {
    it('should get all blocks and render blocks template', async () => {
        const mockBlocks = [
            { id: 1, title: 'Block 1', status: 1 },
            { id: 2, title: 'Block 2', status: 1 },
        ];

        Block.getAll.mockReturnValue(mockBlocks);

        await blocksController.index(req, res);

        expect(res.render).toHaveBeenCalledWith('Blocks', {
            title: 'Blocks',
            blocks: mockBlocks,
            query: req.query,
        });
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('create', () => {
    it('should render editBlock template', async () => {
        await blocksController.create(req, res);

        expect(res.render).toHaveBeenCalledWith('editBlock', {
            title: 'Create Block',
            data: {}
        });
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('edit', () => {
    it('should call Block.get with correct parameters and should render editBlock template', async () => {
        const mockBlock = { id: 1, title: 'Block 1', status: 1 };
        req = {
            params: { id: 1 },
            query: {}
        };

        Block.get.mockReturnValue(mockBlock);

        await blocksController.edit(req, res);

        expect(Block.get).toHaveBeenCalledWith(1);
        expect(res.render).toHaveBeenCalledWith('editBlock', {
            title: 'Edit Block',
            data: mockBlock,
            query: req.query
        });
        expect(res.status).toHaveBeenCalledWith(200);
    })
    it('should redirect if data is null', async () => {
        Block.get.mockReturnValue(null);
        req = {
            params: { id: 90 },
            query: {}
        };

        await blocksController.edit(req, res);

        expect(Block.get).toHaveBeenCalledWith(90);
        expect(res.redirect).toHaveBeenCalledWith('/blocks');
        expect(res.status).toHaveBeenCalledWith(404);
    })
})

describe('save new', () => {
    it('should validate input and send errors', async () => {
        req = {
            body: {
                status: 1,
                input: ''
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { title: 'Title is required' }
                };
            });
        });

        await blocksController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ title: 'Title is required' });
    })
    it('shoud call Block.add after sucsessfull validation and return new id', async () => {
        req = {
            body: {
                title: 'Test',
                status: 1,
                input: ''
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        const mockNewID = 1;
        Block.add.mockReturnValue(mockNewID);

        await blocksController.saveNew(req, res);

        expect(Block.add).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            newID: mockNewID
        });
    })
    it('should return 500 if saving block fails', async () => {
        req = {
            body: {
                title: 'Test',
                status: 1,
                input: ''
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Block.add.mockReturnValue(null);

        await blocksController.saveNew(req, res);

        expect(Block.add).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false
        });
    })
})

describe('save', () => {
    it('should validate input and send errors', async () => {
        req = {
            body: {
                status: 1
            },
            params: {
                id: 1
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { title: 'Title is required' }
                };
            });
        });

        await blocksController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ title: "Title is required" });
    })
    it('shoud call Block.add after sucsessfull validation and send response', async () => {
        req = {
            body: {
                title: 'Test',
                status: 1,
                input: '',
                id: 1
            },
            params: {
                id: 1
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Block.update.mockReturnValue(true);

        await blocksController.save(req, res);

        expect(Block.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ success: true });
    })
    it('should return 500 if saving block fails', async () => {
        req = {
            body: {
                title: 'Test',
                status: 1,
                input: '',
                id: 1
            },
            params: {
                id: 1
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        Block.update.mockReturnValue(false);

        await blocksController.save(req, res);

        expect(Block.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Something went wrong while trying to update the block. Please check the console for more information.'
        })
    })
})

describe('remove', () => {
    it('should call Block.remove and BlockInstance.deleteByBlock', async () => {
        req = {
            params: {
                id: 1
            }
        }

        Block.remove.mockReturnValue(true);
        BlockInstance.deleteByBlock.mockReturnValue(true);

        await blocksController.remove(req, res);

        expect(Block.remove).toHaveBeenCalledWith(1);
        expect(BlockInstance.deleteByBlock).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith('/blocks?message=deleted');
    })
    it('should render error page if Block.remove failed', async () => {
        req = {
            params: {
                id: 1
            }
        }

        Block.remove.mockReturnValue(false);

        await blocksController.remove(req, res);

        expect(Block.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the block. Please check the console for more information.'
        })
    })
    it('should render error page if BlockInstance.deleteByBlock failed', async () => {
        req = {
            params: {
                id: 1
            }
        }

        Block.remove.mockReturnValue(true);
        BlockInstance.deleteByBlock.mockReturnValue(false);

        await blocksController.remove(req, res);

        expect(Block.remove).toHaveBeenCalledWith(1);
        expect(BlockInstance.deleteByBlock).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the block instance. Please check the console for more information.'
        });
    })
})

describe('get', () => {
    it('should call Block.get and send the result as response', async () => {
        const req = {
            params: {
                id: 1
            }
        }

        const mockRow = { id: 1, title: 'Block 1', status: 1 };
        Block.get.mockReturnValue(mockRow);

        await blocksController.get(req, res);

        expect(Block.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            block: mockRow
        });
    })
    it('should send error if Block.get result is null', async () => {
        const req = {
            params: {
                id: 90
            }
        }

        Block.get.mockReturnValue(null);

        await blocksController.get(req, res);

        expect(Block.get).toHaveBeenCalledWith(90);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Something went wrong while trying to get the block. Please check the console for more information.'
        });
    })
})

describe('saveNewInstance', () => {
    it('should valdidate input and send errors', async () => {
        const req = {
            body: {
                contentID: 1,
                blockID: 2
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { output: 'Output is required' }
                };
            });
        });

        await blocksController.saveNewInstance(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: { output: 'Output is required' }
        })
    })
    it('should call BlockInstance.add and send newID as answer', async () => {
        const req = {
            body: {
                contentID: 1,
                blockID: 2,
                output: '{"title": "Hello World"}'
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        const mockNewID = 12
        BlockInstance.add.mockReturnValue(mockNewID);

        await blocksController.saveNewInstance(req, res);

        expect(BlockInstance.add).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            newID: mockNewID
        })
    })
    it('should send error if BlockInstance.add returned null', async () => {
        const req = {
            body: {
                contentID: 1,
                blockID: 2,
                output: '{"title": "Hello World"}'
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(false),
                    errors: {}
                };
            });
        });

        BlockInstance.add.mockReturnValue(null);

        await blocksController.saveNewInstance(req, res);

        expect(BlockInstance.add).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Something went wrong while trying to update the block instance. Please check the console for more information.'
        });
    })
})

describe('updateInstance', () => {
    it('should validate input and send errors', async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                contentID: 1,
                output: '{"title": "Hello World"}'
            }
        }

        jest.mock('../helpers/Validation', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    validate: jest.fn(),
                    hasErrors: jest.fn().mockReturnValue(true),
                    errors: { blockID: 'BlockID is required' }
                };
            });
        });

        await blocksController.updateInstance(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: { blockID: 'BlockID is required' }
        })
    })
    it('should call BlockInstance.update and send answer', async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                contentID: 1,
                output: '{"title": "Hello World"}',
                blockID: 2
            }
        }

        BlockInstance.update.mockReturnValue(true);

        await blocksController.updateInstance(req, res);

        expect(BlockInstance.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ success: true });
    })
    it('should send error if BlockInstance.update failed', async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                contentID: 1,
                output: '{"title": "Hello World"}',
                blockID: 2
            }
        }

        BlockInstance.update.mockReturnValue(false);

        await blocksController.updateInstance(req, res);

        expect(BlockInstance.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Something went wrong while trying to update the block instance. Please check the console for more information.'
        });
    })
})

describe('removeInstance', () => {
    it('should call BlockInstance.remove and send response', async () => {
        const req = {
            params: {
                id: 1
            }
        }

        BlockInstance.remove.mockReturnValue(true);

        await blocksController.removeInstance(req, res);

        expect(BlockInstance.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
        })
    })
    it('should send error if BlockInstance.remove failed', async () => {
        const req = {
            params: {
                id: 1
            }
        }

        BlockInstance.remove.mockReturnValue(false);

        await blocksController.removeInstance(req, res);

        expect(BlockInstance.remove).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Something went wrong while trying to delete the block instance. Please check the console for more information.'
        });
    })
})