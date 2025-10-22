const APIKey = require('../models/APIKey');
const Validation = require('../helpers/Validation');

const index = async (req,res) => {
    const keys = await APIKey.getAll(req.user.tenantID);

    res.status(200).render('apiKeys', {
        title: 'API-Keys',
        keys,
        query: req.query
    })
}

const create = (req,res) => {
    res.status(200).render('editKey', {
        title: 'Create New API-Key',
        query: req.query,
        editingExisting: false,
        data: {},
        messages: {}
    })
}

const edit = async (req,res) => {
    const { id } = req.params;
    const data = await APIKey.get(id);

    if(data===null){
        res.redirect('/api-keys');
    }

    res.status(200).render('editKey', {
        title: 'Edit API-Key',
        query: req.query,
        editingExisting: true,
        data: data,
        messages: {}
    })
}

const saveNew = async (req,res) => {
    const data = {
        name: req.body.name,
        key: req.body.key,
        tenantID: req.user.tenantID
    }

    const validation = new Validation(data);
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("key", "required|string|max:32|min:32");

    if(validation.hasErrors()){

        return res.status(400).render('editKey', {
            title: 'Create New API-Key',
            query: req.query,
            editingExisting: false,
            data,
            messages: validation.errors
        })
    }

    const newID = await APIKey.add(data);
    if(newID===null){
        return res.status(500).render('error',{
            title: 'Error',
            message: 'Something went wrong while trying to save the API-Key. Please check the console for more information.'
        })
    }
    return res.redirect(`/settings/api-keys/edit/${newID}?message=saved`);
}

const save = async (req,res) => {
    const { id } = req.params;
    const data = {
        id,
        name: req.body.name,
        key: req.body.key
    }

    const validation = new Validation(data);
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("key", "required|string|max:32|min:32");

    if(validation.hasErrors()){
        return res.status(400).render('editKey', {
            title: 'Edit API-Key',
            query: req.query,
            editingExisting: true,
            data: data,
            messages: validation.errors
        })
    }

    const success = await APIKey.update(id,data);

    if(success){
        return res.redirect(`/settings/api-keys/edit/${id}?message=saved`);
    }

    return res.status(500).render('error',{
        title: 'Error',
        message: 'Something went wrong while trying to save the API-Key. Please check the console for more information.'
    })
}

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await APIKey.remove(id);
    if (success) {
        res.redirect('/settings/api-keys?message=deleted');
    } else {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the API-Key. Please check the console for more information.'
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