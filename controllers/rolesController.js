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
    // to do: fix error when no perms are given
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
        if(newID===null){
            return res.status(500).render('error',{
                title: 'Error',
                message: 'Something went wrong while trying to save the role. Please check the console for more information.'
            })
        }
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
        res.status(404).render('error',{
            title: 'Error',
            message: 'Something went wrong while trying to update the role. Please check the console for more information.'
        });
    }

}

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await Role.remove(id);
    if (success) {
        res.status(201).redirect('/roles?message=deleted');
    } else {
        res.status(404).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the role. Please check the console for more information.'
        });
    }
}


module.exports = {
    index,
    create,
    edit,
    saveNew,
    save,
    remove
}