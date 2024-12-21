const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = (req, res) => {
    res.render('login',{
        title: 'Login',
        message: ''
    });
}

const validateLogin = async (req, res) => {
    try {
        if(req.body.email===""||req.body.password===""){
            return res.status(400).render('login', {
                title: 'Login',
                message: 'Please enter email and password'
            });
        }

        const foundUser = await User.getByMail(req.body.email);
        if(foundUser === null){
            return res.status(400).render('login', {
                title: 'Login',
                message: 'E-Mail or Password incorrect'
            });
        }

        const passwordCorrect = await bcrypt.compare(req.body.password,foundUser.password);
        if(passwordCorrect){
            const token = authenticateUser(foundUser);
            req.session.authToken = token;
            res.status(200).redirect('/content');

        } else {
            return res.status(400).render('login', {
                title: 'Login',
                message: 'E-Mail or Password incorrect'
            });
        }


    } catch(error){
        console.log('There was a error while trying to validate the login: ' + error);
        res.status(500).render('login',{
            title: 'Login',
            message: 'There was a error while trying to validate the login'
        })
    }
}

const authenticateUser = (user) => {
    const data = {
        id: user.id,
        name: user.name,
    };

    // to do: expire
    return jwt.sign(data,process.env.TOKEN_SECRET);
}

const getAuthToken = (req,res) => {
    const token = req.session.authToken;
    if(token===undefined){
        return res.status(400).send(null);
    }
    res.status(200).send(token);
}

module.exports = {
    index,
    validateLogin,
    getAuthToken,
    authenticateUser
}