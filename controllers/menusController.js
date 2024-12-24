const Menu = require('../models/menu');
const Content = require('../models/content');
const Validation = require('../helpers/Validation');

const index = (req,res) => {
    res.status(200).render('menus', {
        title: 'Menus',
        query: req.query
    })
}

const create = async (req,res) => {
    const content = await Content.getAll();

    res.status(200).render('editMenu', {
        title: 'Create Menu',
        data: {},
        content
    });
}

const saveNew = async (req,res) => {
    const data = {
        title: req.body.title,
        key: req.body.key,
        entries: req.body.entries
    };

    const validation = new Validation(data);

    validation.validate("title","required|string");
    validation.validate("key","required|string|noSpaces");

    if(data.entries!==""){
        validation.validate("entries","string");
    }

    // to do: validate if key is unique

    if (validation.hasErrors()) {
        return res.status(400).send({
            validation: false,
            messages: validation.errors,
            success: false
        });
    }

    const newID = await Menu.add(data);

    if (newID === null) {
        return res.status(500).send({
            validation: true,
            success: false,
            message: 'Something went wrong while trying to save the menu. Please check the console for more information.'
        })
    }
    res.status(201).send({
        validation: true,
        success: true,
        newID
    })

}

module.exports = {
    index,
    create,
    saveNew
}