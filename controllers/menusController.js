const Menu = require('../models/menu');
const Content = require('../models/content');
const Validation = require('../helpers/Validation');
const isEmpty = require('../helpers/isEmpty');

const index = async (req,res) => {
    const menus = await Menu.getAll();

    res.status(200).render('menus', {
        title: 'Menus',
        menus,
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

const edit = async (req,res) => {
    const { id } = req.params;
    const data = await Menu.get(id);
    const content = await Content.getAll();
    if (data === null) {
        res.status(404).redirect('/menus');
    } else {
        res.status(200).render('editMenu', {
            title: 'Edit Menu',
            data,
            query: req.query,
            content
        })
    }
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

    let messages = {...validation.errors};

    if (!('key' in messages) && await Menu.keyExists(data.key)) {
        messages.key = "Key already in use";
    }

    // to do: validate if key is unique

    if (!isEmpty(messages)) {
        return res.status(400).send({
            validation: false,
            messages,
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

const save = async (req,res) => {
    const { id } = req.params;

    const data = {
        title: req.body.title,
        key: req.body.key,
        entries: req.body.entries,
        id
    };

    const validation = new Validation(data);

    validation.validate("title","required|string");
    validation.validate("key","required|string|noSpaces");
    validation.validate("id","required|numeric")

    if(data.entries!==""){
        validation.validate("entries","string");
    }

    let messages = {...validation.errors};

    if (!('key' in messages) && await Menu.keyChanged(id,data.key) && await Menu.keyExists(data.key)) {
        messages.key = "Key already in use";
    }

    if (!isEmpty(messages)) {
        return res.status(400).send(
            {
                validation: false,
                messages,
                success: false
            }
        );
    }

    const success = await Menu.update(id, data);

    if (success) {
        return res.status(201).send({
            validation: true,
            success: true,
        })
    } else {
        return res.status(500).send({
            success: false,
            validation: true,
            message: 'Something went wrong while trying to update the menu. Please check the console for more information.'
        });
    }
}

const get = async (req, res) => {
    const { id } = req.params;
    const menu = await Menu.get(id);

    if (menu === null) {
        return res.status(404).send({
            success: false,
            message: 'Something went wrong while trying to get the menu. Please check the console for more information.'
        });
    }

    res.status(200).send({
        success: true,
        menu
    });
};

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await Menu.remove(id);
    if (success) {
        res.status(201).redirect('/menus?message=deleted');
    } else {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the menu. Please check the console for more information.'
        });
    }
}

module.exports = {
    index,
    create,
    edit,
    saveNew,
    save,
    get,
    remove
}