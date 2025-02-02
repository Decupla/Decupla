const mediaController = require('../mediaController');
const Media = require('../../models/media');
const sanitizeFilename = require('../../helpers/sanitizeFilename');

jest.mock('../../models/media');
jest.mock('../../helpers/sanitizeFilename');

let req = {}
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });

});

afterEach(() => {
    jest.clearAllMocks();
});

describe('index', () => {
    it('should call Media.getAll and render media template', async () => {
        const mockRows = [{ id: 1, file: 'test.png', alt: 'Test', type: 'image/png', size: 123 }];
        Media.getAll.mockResolvedValue(mockRows);

        await mediaController.index(req, res);

        expect(Media.getAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('media', {
            title: 'Media',
            media: mockRows,
            query: req.query,
        });
    });
});

describe('create', () => {
    it('should render editMedia template', () => {
        mediaController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editMedia', {
            title: 'Add Media',
            messages: {},
            editingExisting: false,
            data: {},
            query: req.query,
        });
    });
});

describe('edit', () => {
    it('should call Media.get and render editMedia template', async () => {
        req.params = {
            id: 1,
        };

        const mockRow = { id: 1, file: 'test.png', alt: 'Test', type: 'image/png', size: 123 };
        Media.get.mockResolvedValue(mockRow);

        await mediaController.edit(req, res);

        expect(Media.get).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('editMedia', {
            title: 'Edit Media',
            messages: {},
            editingExisting: true,
            data: mockRow,
            query: req.query,
        });
    });

    it('should redirect to /media if Media.get returned null', async () => {
        req.params = {
            id: 1,
        };

        Media.get.mockResolvedValue(null);

        await mediaController.edit(req, res);

        expect(res.redirect).toHaveBeenCalledWith('/media');
    });
});

describe('saveNew', () => {
    beforeEach(() => {
        req = {
            files: {
                file: {
                    name: 'test.png',
                    size: 123,
                    mimetype: 'image/png',
                    mv: jest.fn(),
                },
            },
            body: {
                alt: 'Test Image',
            },
        };
        sanitizeFilename.mockReturnValue('test.png');
        req.files.file.mv.mockImplementation((path, callback) => callback(null));
    });

    it('should render editMedia template with error message if no file is sent', async () => {
        delete req.files;

        await mediaController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('editMedia', {
            title: 'Add Media',
            messages: { error: 'No file selected' },
            editingExisting: false,
            data: req.body,
            query: req.query,
        });
    });
    it('should save new media and redirect on success', async () => {
        Media.add.mockResolvedValue(1);

        await mediaController.saveNew(req, res);

        expect(req.files.file.mv).toHaveBeenCalled();
        expect(Media.add).toHaveBeenCalledWith({
            file: 'test.png',
            alt: req.body.alt,
            size: (req.files.file.size / 1024).toFixed(2),
            type: req.files.file.mimetype,
        });
        expect(res.redirect).toHaveBeenCalledWith('/media/edit/1?message=saved');
    });
    it('should render editMedia template with error message if Media.add resolved null', async () => {
        Media.add.mockResolvedValue(null);

        await mediaController.saveNew(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('editMedia', {
            title: 'Add Media',
            messages: { error: 'There was an error saving the media. Please check the console for more informations' },
            editingExisting: false,
            data: req.body,
            query: req.query
        })
    })
    // it('should log errors and render editMedia template with error message', async () => {
    //     const error = new Error('File move failed');
    //     req.files.file.mv.mockRejectedValue(error);

    //     await mediaController.saveNew(req, res);

    //     expect(console.log).toHaveBeenCalledWith(error);
    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.render).toHaveBeenCalledWith('editMedia', {
    //       title: 'Add Media',
    //       messages: { error: 'There was an error uploading the file. Please check the console for more informations' },
    //       editingExisting: false,
    //       data: req.body,
    //       query: req.query,
    //     });
    //   });
});

describe('save', () => {
    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: { alt: 'Mocked Alt Text' },
            files: {},
            query: {}
        };
        sanitizeFilename.mockImplementation(filename => filename);
    });

    it('should store uploaded file', async () => {
        const mockFile = {
            name: 'test.png',
            size: 123,
            mimetype: 'image/png',
            mv: jest.fn((path, callback) => callback(null))
        };
        req.files.file = mockFile;
        Media.get.mockResolvedValue({ file: 'old.jpg' });
        Media.update.mockResolvedValue(true);

        await mediaController.save(req, res);

        expect(sanitizeFilename).toHaveBeenCalledWith('test.png');
        expect(mockFile.mv).toHaveBeenCalled();
        expect(Media.update).toHaveBeenCalledWith('1', {
            alt: 'Mocked Alt Text',
            file: 'test.png',
            size: (req.files.file.size / 1024).toFixed(2),
            type: 'image/png'
        });
        expect(res.redirect).toHaveBeenCalledWith('/media/edit/1?message=saved');
    });
    it('should save media without file upload', async () => {
        Media.update.mockResolvedValue(true);

        await mediaController.save(req, res);

        expect(Media.update).toHaveBeenCalledWith('1', { alt: 'Mocked Alt Text' });
        expect(res.redirect).toHaveBeenCalledWith('/media/edit/1?message=saved');
    });
    it('should render editMedia template with error message if Media.get returned null', async () => {
        const mockFile = {
            name: 'test.png',
            size: 123,
            mimetype: 'image/png',
            mv: jest.fn((path, callback) => callback(null))
        };
        req.files.file = mockFile;
        Media.get.mockResolvedValue(null);

        await mediaController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('editMedia', {
            title: 'Edit Media',
            messages: { error: 'Error retrieving current media. Please check the console for more information.' },
            editingExisting: true,
            data: req.body,
            query: req.query
        });
    })
    it('should render editMedia template with error message if Media.update failed', async () => {
        const mockFile = {
            name: 'test.png',
            size: 123,
            mimetype: 'image/png',
            mv: jest.fn((path, callback) => callback(null))
        };
        req.files.file = mockFile;
        Media.get.mockResolvedValue({ file: 'old.jpg' });
        Media.update.mockResolvedValue(false);

        await mediaController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('editMedia', {
            title: 'Edit Media',
            messages: { error: 'Error updating media. Please check the console for more information.' },
            editingExisting: true,
            data: req.body,
            query: req.query
        });
    });
    it('should log errors and render editMedia template with error message', async () => {
        const mockFile = {
            name: 'test.png',
            size: 123,
            mimetype: 'image/png',
            mv: jest.fn((path, callback) => callback(new Error('File upload error')))
        };
        req.files.file = mockFile;
        Media.get.mockResolvedValue({ file: 'oldMedia.png' });

        await mediaController.save(req, res);

        expect(console.error).toHaveBeenCalledWith(expect.any(Error));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('editMedia', {
            title: 'Edit Media',
            messages: { error: 'An error occurred while processing the request. Please check the console for more information.' },
            editingExisting: true,
            data: req.body,
            query: req.query
        });
    });
})

describe('remove', () => {
    beforeEach(() => {
        req.params = {id: 1}
    });

    it('should remove media and redirect', async () => {
        const mockMedia = { file: 'test.png' };
        Media.get.mockResolvedValue(mockMedia);
        Media.remove.mockResolvedValue(true);

        await mediaController.remove(req, res);

        expect(Media.get).toHaveBeenCalledWith(1);
        expect(Media.remove).toHaveBeenCalledWith(1);
        expect(res.redirect).toHaveBeenCalledWith('/media?message=deleted');
    });
    it('should redirect to /media if Media.get returned null',async ()=>{
        Media.get.mockResolvedValue(null);

        await mediaController.remove(req, res);

        expect(res.redirect).toHaveBeenCalledWith('/media');
    });
    it('should render error template of Media.remove failed', async () => {
        const mockMedia = { file: 'test.png' };
        Media.get.mockResolvedValue(mockMedia);
        Media.remove.mockResolvedValue(false);

        await mediaController.remove(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            messages: { error: 'An error occurred while trying to delete the media. Please check the console for more information.' },
        });
    });
})

describe('getAll', () => {
    it('should call Media.getAll and send result', async () => {
        const mockRows = [{ id: 1, file: 'test.png', alt: 'Test', type: 'image/png', size: 123 }];
        Media.getAll.mockResolvedValue(mockRows);

        await mediaController.getAll(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockRows);
    })
})