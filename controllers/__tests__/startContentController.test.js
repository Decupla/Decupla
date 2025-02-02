const startContentController = require('../startContentController');
const Content = require('../../models/content');
const Setting = require('../../models/setting');
const Validation = require('../../helpers/Validation');

jest.mock('../../models/content');
jest.mock('../../models/setting');
jest.mock('../../helpers/Validation');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('index', () => {
    it('shoud call Content.getAllPublished and Setting.get and render startContent template', async () => {
        const mockContent = [
            { id: 1, title: 'Home', status: 1 },
            { id: 2, title: 'Status', status: 1 },
        ]
        Content.getAllPublished.mockResolvedValue(mockContent);
        Setting.get.mockResolvedValue('1');

        await startContentController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('startContent', {
            title: 'Edit Start Content',
            content: mockContent,
            messages: {},
            selectedContent: 1
        });
    });
    it('should set 0 as selectedContent if Setting.get returned null', async () => {
        const mockContent = [
            { id: 1, title: 'Home', status: 1 },
            { id: 2, title: 'Status', status: 1 },
        ]
        Content.getAllPublished.mockResolvedValue(mockContent);
        Setting.get.mockResolvedValue(null);

        await startContentController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('startContent', {
            title: 'Edit Start Content',
            content: mockContent,
            messages: {},
            selectedContent: 0
        });
    })
})

describe('save', () => {
    let mockContent;

    beforeEach(() => {
        mockContent = [
            { id: 1, title: 'Home', status: 1 },
            { id: 2, title: 'Status', status: 1 },
        ];
        Content.getAllPublished.mockResolvedValue(mockContent);
    })

    it('should validate input and render startContent template with errors', async () => {
        req.body = {
            startContent: ''
        };

        Setting.get.mockResolvedValue('0');
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(true),
        }));

        await startContentController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('startContent', {
            title: 'Edit Start Content',
            content: mockContent,
            selectedContent: 0,
            messages: { error: 'Please select a valid content' },
        });
    });
    it('should call Setting.update and render startContent template with success message', async () => {
        req.body = {
            startContent: '1'
        };

        Setting.get.mockResolvedValue('0');
        Setting.update.mockResolvedValue(true);
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(false),
        }));

        await startContentController.save(req, res);

        expect(Setting.update).toHaveBeenCalledWith({
            key: "startContent",
            value: '1'
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('startContent', {
            title: 'Edit Start Content',
            content: mockContent,
            selectedContent: 1,
            messages: { success: 'Start content was saved successfully' },
        });
    });
    it('should log errors and render startContent template with error message', async () => {
        req.body = {
            startContent: '1'
        };

        Setting.get.mockResolvedValue('0');
        Setting.update.mockResolvedValue(false);
        Validation.mockImplementation(() => ({
            validate: jest.fn(),
            hasErrors: jest.fn().mockReturnValue(false),
        }));

        await startContentController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('startContent', {
          title: 'Edit Start Content',
          content: mockContent,
          selectedContent: '1',
          messages: { error: 'Something went wrong while trying to save the start content' },
        });
    })
})