const Validation = require('../helpers/Validation');
const isEmpty = require('../helpers/isEmpty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const index = (req, res) => {
    res.render('setup', {
        title: 'Setup',
        loggedIn: false,
        messages: {},
        data: {}
    })
}


const validateSetup = async (req, res) => {
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: 0
    }

    const validation = new Validation(data);
    validation.validate("email", "required|email");
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("password", "required|max:30|min:8");

    if (validation.hasErrors()) {
        return res.status(400).render('setup', {
            title: 'Setup',
            loggedIn: false,
            messages: validation.errors,
            data
        })
    }

    data.password = await bcrypt.hash(data.password, 10);

    const newID = await User.add(data);
    if (newID === null) {
        return res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to save the user. Please check the console for more information.'
        })
    }

    const token = jwt.sign({ id: newID, name: data.name },process.env.TOKEN_SECRET);
    req.session.authToken = token;
    res.status(201).redirect(`/content`);
}

module.exports = {
    index,
    validateSetup
};