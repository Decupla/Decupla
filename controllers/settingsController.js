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
        origins
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
    res.send('origin saved');
    // res.status(201).redirect(`/roles/edit/${newID}?message=saved`);
}

module.exports = {
    index,
    showAllowedOrigins,
    createOrigin,
    saveNewOrigin
}