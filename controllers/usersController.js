const User = require('../models/user');
const Validation = require('../helpers/Validation');

const index = async (req, res) => {
    const users = await User.getAll();

    res.render('users', {
        title: 'Users',
        users,
        query: req.query
    })
}

const create = (req, res) => {
    res.render('addUser', {
        title: 'Create User'
    })
}

const edit = async (req, res) => {
    const { id } = req.params;
    // get content data by id
    const data = await User.get(id);
    if (data === null) {
        res.status(404).redirect('/users');
    }
    res.render('editUser', {
        title: 'Edit User',
        data,
        query: req.query
    });
}

const saveNew = async (req, res) => {
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    };

    const validation = new Validation(data);
    validation.validate("email", "required|email");
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("password", "required|max:30|min:8");
    validation.validate("role", "required|numeric");

    if (validation.hasErrors()) {
        res.status(400).send(validation.errors);
    } else {
        const newID = await User.add(data);
        if(newID===null){
            return res.status(500).render('error',{
                title: 'Error',
                message: 'Something went wrong while trying to save the user. Please check the console for more information.'
            })
        }
        res.status(201).redirect(`/users/edit/${newID}?message=saved`);
    }
}

const save = async (req, res) => {
    const { id } = req.params;
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        id
    };

    const validation = new Validation(data);
    validation.validate("email", "required|email");
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("password", "required|max:30|min:8");
    validation.validate("role", "required|numeric");
    validation.validate("id", "required|numeric");
    if (validation.hasErrors()) {
        res.status(400).send(validation.errors);
    }
    const success = await User.update(id, data);
    if(success){
        res.status(201).redirect(`/users/edit/${id}?message=saved`);
    } else {
        res.status(404).render('error',{
            title: 'Error',
            message: 'Something went wrong while trying to update the user. Please check the console for more information.'
        });
    }
}
const remove = async (req, res) => {
    const { id } = req.params;
    const success = await User.remove(id);
    if(success){
        res.status(201).redirect('/users?message=deleted');
    } else {
        res.status(404).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the user. Please check the console for more information.'
        });
    }
}


module.exports = {
    index,
    create,
    saveNew,
    save,
    edit,
    remove
}