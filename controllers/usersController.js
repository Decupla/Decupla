const User = require('../models/user');
const Role = require('../models/role');
const Validation = require('../helpers/Validation');
const isEmpty = require('../helpers/isEmpty');
const bcrypt = require('bcrypt');

const index = async (req, res) => {
    const users = await User.getAll();

    for (const user of users) {
        if (user.role === 0) {
            user.role = "Admin";
            continue;
        }

        const userRole = await Role.get(user.role);

        if (userRole === null) {
            user.role = "";
            continue;
        }

        user.role = userRole.name;
    }

    res.status(200).render('users', {
        title: 'Users',
        users,
        query: req.query
    });
};

const create = async (req, res) => {
    const roles = await Role.getAll();

    res.status(200).render('editUser', {
        title: 'Create User',
        data: {},
        messages: {},
        editingExisting: false,
        query: req.query,
        roles,
    })
}

const edit = async (req, res) => {
    const { id } = req.params;
    const roles = await Role.getAll();
    // get content data by id
    const data = await User.get(id);
    if (data === null) {
        return res.status(404).redirect('/users');
    }

    data.password = "";

    res.status(200).render('editUser', {
        title: 'Edit User',
        data,
        query: req.query,
        messages: {},
        editingExisting: true,
        query: req.query,
        roles
    });
}

const saveNew = async (req, res) => {
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    };

    if('role' in req.body){
        data.role = parseInt(req.body.role)
    }

    const validation = new Validation(data);
    validation.validate("email", "required|email");
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("password", "required|max:30|min:8");
    validation.validate("role", "required|numeric");

    let messages = {...validation.errors};

    if (!('email' in messages) && await User.mailExists(data.email)) {
        messages.email = "Mail already in use";
    }
    

    if(!isEmpty(messages)){
        const roles = await Role.getAll();

        return res.status(400).render('editUser',{
            title: 'Create User',
            data,
            messages,
            editingExisting: false,
            query: req.query,
            roles
        })
    }

    data.password = await bcrypt.hash(data.password,10);

    const newID = await User.add(data);
    if (newID === null) {
        return res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to save the user. Please check the console for more information.'
        })
    }
    res.status(201).redirect(`/users/edit/${newID}?message=saved`);
}

const save = async (req, res) => {
    const { id } = req.params;
    const data = {
        email: req.body.email,
        name: req.body.name,
        id
    };

    if('role' in req.body){
        data.role = parseInt(req.body.role)
    }

    const newPasswordSet = ('newPassword' in req.body) && req.body.newPassword!=="";

    if(newPasswordSet){
        data.password = req.body.newPassword
    }

    const validation = new Validation(data);
    validation.validate("email", "required|email");
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("role", "required|numeric");
    validation.validate("id", "required|numeric");

    if(newPasswordSet){
        validation.validate("password", "max:30|min:8");
    }

    let messages = {...validation.errors};

    if(!('email' in messages) && await User.emailChanged(id,data.email) && await User.mailExists(data.email)){
        messages.email = "Mail already in use";
    }
    
    if(!isEmpty(messages)){
        const roles = await Role.getAll();

        return res.status(400).render('editUser',{
            title: 'Edit User',
            data,
            messages,
            editingExisting: true,
            query: req.query,
            roles
        })
    }

    if(newPasswordSet){
        data.password = await bcrypt.hash(data.password,10);
    }

    const success = await User.update(id, data);
    if (success) {
        res.status(201).redirect(`/users/edit/${id}?message=saved`);
    } else {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to update the user. Please check the console for more information.'
        });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await User.remove(id);
    if (success) {
        res.status(201).redirect('/users?message=deleted');
    } else {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the user. Please check the console for more information.'
        });
    }
}

// const hasPermission = async (id, permission) => {
//     const user = User.get(id);
//     if(user===null){
//         return false;
//     }
//     const role = Role.get(user.role);
//     if(role===null){
//         return false;
//     }

//     const perms = role.perms.split(',');
//     return perms.contains(permission);
// }

// const getCurrentID = () => {
//     try {
//         const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);   
//         return tokenData.id;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

module.exports = {
    index,
    create,
    saveNew,
    save,
    edit,
    remove,
}