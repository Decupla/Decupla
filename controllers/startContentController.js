const Content = require('../models/content');
const Settings = require('../models/settings');
const Validation = require('../helpers/validation');

const index = async (req,res) => {
    const content = await Content.getAllPublished();
    const selectedContent = parseInt(await Settings.get('startContent'), 10) || 0;

    res.status(200).render('startContent', {
        title: 'Edit Start Content',
        content,
        messages: {},
        selectedContent
    })
}

const save = async (req,res) => {
    const content = await Content.getAllPublished();
    const selectedContent = parseInt(await Settings.get('startContent'), 10) || 0;

    const data = {
        key: 'startContent',
        value: req.body.startContent,
    }

    const validation = new Validation(data);
    validation.validate("value", "required|numeric");
    if(validation.hasErrors()){
        res.status(400).render('startContent', {
            title: 'Edit Start Content',
            content,
            selectedContent,
            messages: {
                'error': 'Please select a valid content'
            }
        })
    }

    const success = await Settings.update(data);

    if(success){
        return res.status(200).render('startContent', {
            title: 'Edit Start Content',
            content,
            selectedContent: parseInt(data.value),
            messages: {
                'success': 'Start content was saved successfully'
            }
        })
    } 

    res.status(500).render('startContent', {
        title: 'Edit Start Content',
        content,
        selectedContent: data.value,
        messages: {
            'error': 'Something went wrong while trying to save the start content'
        }
    })
}

module.exports = {
    index,
    save
}