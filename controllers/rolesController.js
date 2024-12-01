const Validation = require('../helpers/Validation');
const Role = require('../models/role');

const index = async (req, res) => {
    const roles = await Role.getAll();

    res.render('roles', {
        title: 'Roles',
        roles,
        query: req.query
    })
}

const create = async (req, res) => {
    res.render('addRole', {
        title: 'Create Role',
        query: req.query
    })
}

const edit = async (req, res) => {
    const { id } = req.params;

    const data = await Role.get(id);
    if (data === null) {
        res.status(404).redirect('/roles');
    } else {
        const perms = data.perms.split(',');
        res.render('editRole', {
            title: 'Edit Role',
            data,
            perms,
            query: req.query
        });
    }
}

const saveNew = async (req, res) => {
    const perms = req.body.permissions.toString()
    const data = {
        name: req.body.name,
        perms
    }

    const validation = new Validation(data);
    validation.validate("name", "required|string");
    validation.validate("perms", "required|string");
    if (validation.hasErrors()) {
        res.status(400).send(validation.errors);
    } else {
        const newID = await Role.add(data);
        res.status(201).redirect(`/roles/edit/${newID}?message=saved`);
    }
}

const save = async (req, res) => {
    const { id } = req.params;
    const perms = req.body.permissions.toString()

    const data = {
        name: req.body.name,
        perms,
        id
    }

    const validation = new Validation(data);
    validation.validate("name", "required|string");
    validation.validate("perms", "required|string");
    validation.validate("id", "required|numeric");
    if (validation.hasErrors()) {
        return res.status(400).send(validation.errors);
    }

    const success = await Role.update(id, data);
    if (success) {
        res.status(201).redirect(`/roles/edit/${id}?message=saved`);
    } else {
        //to do: error page
        res.status(404).send('role to update not found');
    }

}

const remove = async (req, res) => {
    const { id } = req.params;
    await Role.remove(id);
    res.status(201).redirect('/roles?message=deleted');
}

module.exports = {
    index,
    create,
    edit,
    saveNew,
    save,
    remove
}