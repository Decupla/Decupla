const Validation = require('../helpers/Validation');
const Role = require('../models/role');

const index = async (req, res) => {
    const roles = await Role.getAll(req.user.tenantID);

    res.status(200).render('roles', {
        title: 'Roles',
        roles,
        query: req.query
    })
}

const create = async (req, res) => {
    res.render('editRole', {
        title: 'Create Role',
        query: req.query,
        data: {},
        rolePerms: [],
        editingExisting: false,
        messages: {}
    })
}

const edit = async (req, res) => {
    const { id } = req.params;

    const data = await Role.get(id);
    if (data === null) {
        res.redirect('/roles');
    } else {
        const rolePerms = data.perms.split(',');
        res.status(200).render('editRole', {
            title: 'Edit Role',
            data,
            query: req.query,
            rolePerms,
            editingExisting: true,
            messages: {}
        });
    }
}

const saveNew = async (req, res) => {
    if(req.body.permissions===undefined){
        return res.status(400).render('editRole', {
            title: 'Create Role',
            query: req.query,
            data: req.body,
            rolePerms: [],
            editingExisting: false,
            messages: {perms: 'Please set at least one permission'}
        })
    }

    const perms = req.body.permissions.toString()

    const data = {
        name: req.body.name,
        perms,
        tenantID: req.user.tenantID
    }

    const validation = new Validation(data);
    validation.validate("name", "required|string");
    validation.validate("perms", "required|string");
    if (validation.hasErrors()) {
        res.status(400).render('editRole', {
            title: 'Create Role',
            query: req.query,
            data: req.body,
            rolePerms: req.body.permissions,
            editingExisting: false,
            messages: validation.errors
        })
    } else {
        const newID = await Role.add(data);
        if(newID===null){
            return res.status(500).render('error',{
                title: 'Error',
                message: 'Something went wrong while trying to save the role. Please check the console for more information.'
            })
        }
        res.redirect(`/roles/edit/${newID}?message=saved`);
    }
}

const save = async (req, res) => {
    const { id } = req.params;

    if(req.body.permissions===undefined){
        return res.status(400).render('editRole', {
            title: 'Edit Role',
            query: req.query,
            data: {...req.body, id},
            rolePerms: [],
            editingExisting: true,
            messages: {perms: 'Please set at least one permission'}
        })
    }

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
        return res.status(400).render('editRole', {
            title: 'Edit Role',
            query: req.query,
            data,
            rolePerms: req.body.permissions,
            editingExisting: true,
            messages: validation.errors
        })
    }

    const success = await Role.update(id, data);
    if (success) {
        res.redirect(`/roles/edit/${id}?message=saved`);
    } else {
        res.status(500).render('error',{
            title: 'Error',
            message: 'Something went wrong while trying to update the role. Please check the console for more information.'
        });
    }

}

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await Role.remove(id);
    if (success) {
        res.redirect('/roles?message=deleted');
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