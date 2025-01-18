const setupController = require('../setupController');
const User = require('../../models/user');
const Validation = require('../../helpers/Validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


jest.mock('../../helpers/Validation');
jest.mock('../../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

let req = {
    session: {}
};
const res = {
    status: jest.fn(() => res),
    render: jest.fn(),
    redirect: jest.fn()
};

afterEach(() => {
    jest.clearAllMocks();
});


describe('index', () => {
    it('should render setup template with correct parameters', () => {

        setupController.index(req, res);

        expect(res.render).toHaveBeenCalledWith('setup', {
            title: 'Setup',
            loggedIn: false,
            messages: {},
            data: {}
        });
    });
});

describe('validateSetup', () => {
    beforeEach(() => {
        Validation.mockClear();
        bcrypt.hash.mockClear();
        jwt.sign.mockClear();
        User.add.mockClear();
    });

    it('should validate input and save user if valid', async () => {
        req.body = {
            email: 'nils@gmail.com',
            name: 'Nils',
            password: 'Password123'
        }

        Validation.prototype.validate = jest.fn();
        Validation.prototype.hasErrors = jest.fn(() => false);
        bcrypt.hash.mockResolvedValue('hashedPassword');
        User.add.mockResolvedValue(1);
        jwt.sign.mockReturnValue('usertoken');

        await setupController.validateSetup(req, res);

        expect(Validation.prototype.validate).toHaveBeenCalledWith('email', 'required|email');
        expect(Validation.prototype.validate).toHaveBeenCalledWith('name', 'required|string|max:25|min:3');
        expect(Validation.prototype.validate).toHaveBeenCalledWith('password', 'required|max:30|min:8');
        expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
        expect(User.add).toHaveBeenCalledWith({
            email: 'nils@gmail.com',
            name: 'Nils',
            password: 'hashedPassword',
            role: 0
        });
        expect(jwt.sign).toHaveBeenCalledWith({ id: 1, name: 'Nils' }, process.env.TOKEN_SECRET);
        expect(req.session.authToken).toBe('usertoken');
        expect(res.redirect).toHaveBeenCalledWith('/content');
    })
    it('should render setup template with errors if validation fails', async () => {
        req.body = {
            email: '',
            name: 'Nils',
            password: 'Password123'
        }


        Validation.prototype.validate = jest.fn();
        Validation.prototype.hasErrors = jest.fn(() => true);
        Validation.prototype.errors = { email: ' Email is required ' };

        await setupController.validateSetup(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('setup', {
            title: 'Setup',
            loggedIn: false,
            messages: { email: ' Email is required ' },
            data: {
                email: '',
                name: 'Nils',
                password: 'Password123',
                role: 0
            }
        });
    });
    it('should render error template if saving the user fails', async () => {
        req.body = {
            email: 'nils@gmail.com',
            name: 'Nils',
            password: 'Password123'
        }

        Validation.prototype.validate = jest.fn();
        Validation.prototype.hasErrors = jest.fn(() => false);
        bcrypt.hash.mockResolvedValue('hashedPassword');
        User.add.mockResolvedValue(null);

        await setupController.validateSetup(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('error', {
            title: 'Error',
            message: 'Something went wrong while trying to save the user. Please check the console for more information.'
        });
    });
})
