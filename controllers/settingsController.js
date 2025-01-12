const Origin = require('../models/origin');
const Validation = require('../helpers/Validation');

const index = (req,res) => {
    res.status(200).render('settings', {
        title: 'Settings'
    })
}

const showAllowedOrigins = async (req,res) => {
    const origins = await Origin.getAll();

    res.status(200).render('allowedOrigins', {
        title: 'Allowed Request Origings',
        origins,
        query: req.query
    })
}

const createOrigin = (req,res) => {
    res.status(200).render('editOrigin', {
        title: 'Create New Origin',
        query: req.query,
        editingExisting: false,
        data: {},
        messages: {}
    })
}

const editOrigin = async (req,res) => {
    const { id } = req.params;
    const data = await Origin.get(id);

    res.status(200).render('editOrigin', {
        title: 'Edit Origin',
        query: req.query,
        editingExisting: true,
        data: data,
        messages: {}
    })
}

const saveNewOrigin = async (req,res) => {
    const data = {
        name: req.body.name,
        APIKey: req.body.APIKey
    }

    const validation = new Validation(data);
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("APIKey", "required|string|max:32|min:32");

    if(validation.hasErrors()){
        return res.status(400).render('editOrigin', {
            title: 'Create New Origin',
            query: req.query,
            editingExisting: false,
            data,
            messages: validation.errors
        })
    }

    const newID = await Origin.add(data);
    if(newID===null){
        return res.status(500).render('error',{
            title: 'Error',
            message: 'Something went wrong while trying to save the origin. Please check the console for more information.'
        })
    }
    return res.status(201).redirect(`/settings/origins/edit/${newID}?message=saved`);
}

const saveOrigin = async (req,res) => {
    const { id } = req.params;
    const data = {
        id,
        name: req.body.name,
        APIKey: req.body.APIKey
    }

    const validation = new Validation(data);
    validation.validate("name", "required|string|max:25|min:3");
    validation.validate("APIKey", "required|string|max:32|min:32");

    if(validation.hasErrors()){
        return res.status(400).render('editOrigin', {
            title: 'Edit Origin',
            query: req.query,
            editingExisting: true,
            data: data,
            messages: validation.errors
        })
    }

    const success = await Origin.update(id,data);

    if(success){
        return res.status(201).redirect(`/settings/origins/edit/${id}?message=saved`);
    }

    return res.status(500).render('error',{
        title: 'Error',
        message: 'Something went wrong while trying to save the origin. Please check the console for more information.'
    })
}

const removeOrigin = async (req, res) => {
    const { id } = req.params;
    const success = await Origin.remove(id);
    if (success) {
        res.status(201).redirect('/settings/origins?message=deleted');
    } else {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the origin. Please check the console for more information.'
        });
    }
}

module.exports = {
    index,
    showAllowedOrigins,
    createOrigin,
    editOrigin,
    saveNewOrigin,
    saveOrigin,
    removeOrigin
}