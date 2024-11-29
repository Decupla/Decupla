const User = require('../models/user');
const Validation = require('../helpers/Validation');

const index = async (req,res) => {
    const users = await User.getAll();

    res.render('users',{
        title: 'Users',
        users,
        query: req.query
    })
}

const create = (req,res) => {
    res.render('addUser',{
        title: 'Create User'
    })
}

const saveNew = async (req,res) => {
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    };

    const validation = new Validation(data);
    validation.validate("email","required|email");
    validation.validate("name","required|string|max:25|min:3");
    validation.validate("password","required|max:30|min:8");
    validation.validate("role","required|numeric");

    if(validation.hasErrors()){
        res.status(400).send(validation.errors);
    } else {
        const newID = await User.add(data);
        res.status(201).redirect(`/users/edit/${newID}?message=saved`);
    }
}

module.exports = {
    index,
    create,
    saveNew
}