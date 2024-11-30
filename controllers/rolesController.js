const Validation = require('../helpers/Validation');
const Role = require('../models/role');

const index = async (req,res) => {
    const roles = await Role.getAll();

    res.render('roles',{
        title: 'Roles',
        roles,
        query: req.query
    })
}

const create = async (req,res) => {
    res.render('addRole',{
        title: 'Create Role',
        query: req.query
    })
}

const edit = async (req,res) => {
    const { id } = req.params;

    const data = await Role.get(id);
    const perms = data.perms.split(',');
    res.render('editRole',{
        title: 'Edit Role',
        data,
        perms,
        query: req.query
    });
}

const saveNew = async (req,res) => {
    const perms = req.body.permissions.toString()
    const data = {
        name: req.body.name,
        perms
    }

    const validation = new Validation(data);
    validation.validate("name","required|string");
    validation.validate("perms","required|string");
    if(validation.hasErrors()){
        res.status(400).send(validation.errors);
    } else {
        const newID = await Role.add(data);
        res.status(201).redirect(`/roles/edit/${newID}?message=saved`);
    }
}

const save = (req,res) => {
    const { id } = req.params;
    const perms = req.body.permissions.toString()

    const data = {
        name: req.body.name,
        perms,
        id
    } 

    const validation = new Validation(data);
    validation.validate("name","required|string");
    validation.validate("perms","required|string");
    validation.validate("id","required|numeric");
    if(validation.hasErrors()){
        res.status(400).send(validation.errors);
    } else {
        Role.update(id,data);
        res.status(201).redirect(`/roles/edit/${id}?message=saved`);
    }
}

module.exports = {
    index,
    create,
    edit,
    saveNew,
    save
}