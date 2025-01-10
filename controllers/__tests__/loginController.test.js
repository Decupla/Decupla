const loginController = require('../loginController');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

let req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn()
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('index', () => {
    it('should render login template', () => {
        loginController.index(req, res);

        expect(res.render).toHaveBeenCalledWith('login', {
            title: 'Login',
            message: '',
            loggedIn: false
        })
    })
})

describe('validateLogin', () => {
    it('should render login page if no email or password was send', async () => {
        const req = {
            body: {
                email: 'nils@gmail.com',
                password: ''
            }
        };

        await loginController.validateLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('login', {
            title: 'Login',
            message: 'Please enter email and password',
            loggedIn: false
        })
    })

    it('should render login page if no user was found using User.getByMail', async () => {
        const req = {
            body: {
                email: 'nils@gmail.de',
                password: 'login123'
            }
        };

        User.getByMail.mockReturnValue(null);

        await loginController.validateLogin(req, res);

        expect(User.getByMail).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('login', {
            title: 'Login',
            message: 'E-Mail or Password incorrect',
            loggedIn: false
        })
    })

    it('should call User.getByMail and redirect if password is correct', async () => {
        const req = {
            body: {
                email: 'nils@gmail.com',
                password: 'login123'
            },
            session: {}
        };

        const mockRow = { id: 1, name: 'Nils', email: 'nils@gmail.com', password: 'login123' };

        User.getByMail.mockReturnValue(mockRow);
        bcrypt.compare.mockReturnValue(true);
        jwt.sign.mockReturnValue('mocked_token');

        const mockToken = 'mocked_token';
        const authenticateUser = jest.fn().mockReturnValue(mockToken);
        loginController.authenticateUser = authenticateUser;

        process.env.TOKEN_SECRET = 'secret_key';

        await loginController.validateLogin(req, res);

        expect(User.getByMail).toHaveBeenCalledWith(req.body.email);
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'login123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.redirect).toHaveBeenCalledWith('/content');
    })

    it('should call User.getByMail and redirect if password is correct', async () => {
        const req = {
            body: {
                email: 'nils@gmail.com',
                password: 'login456'
            },
            session: {}
        };

        const mockRow = { id: 1, name: 'Nils', email: 'nils@gmail.com', password: 'login123' };

        User.getByMail.mockReturnValue(mockRow);
        bcrypt.compare.mockReturnValue(false);

        await loginController.validateLogin(req, res);

        expect(User.getByMail).toHaveBeenCalledWith(req.body.email);
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'login123');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('login', {
            title: 'Login',
            message: 'E-Mail or Password incorrect',
            loggedIn: false
        })
    })
    it('should log errors and render login page if an errors occurs', async () => {
        const req = {
            body: {
                email: 'nils@gmail.com',
                password: 'login123'
            },
        };

        User.getByMail.mockRejectedValue(new Error('Database error'));

        console.log = jest.fn();

        await loginController.validateLogin(req,res);

        expect(console.log).toHaveBeenCalledWith('There was a error while trying to validate the login: Error: Database error');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.render).toHaveBeenCalledWith('login', {
            title: 'Login',
            message: 'There was a error while trying to validate the login',
            loggedIn: false
        });
    })
})

describe('getAuthToken', () => {
    it('should return 400 if token is not in session', () => {
        const req = {
            session: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        loginController.getAuthToken(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(null);
    });

    it('should return 200 and the token if token is in session', () => {
        const req = {
            session: {
                authToken: 'mocked_token'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        loginController.getAuthToken(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('mocked_token');
    });
});

