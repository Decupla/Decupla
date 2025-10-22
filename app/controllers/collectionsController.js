const Validation = require('../helpers/Validation');
const isEmpty = require('../helpers/isEmpty');
const Collection = require('../models/collection');

const index = async (req, res) => {
    const collections = await Collection.getAll(req.user.tenantID);

    res.status(200).render('collections', {
        title: 'Content',
        query: req.query,
        collections
    });
}

const create = async (req, res) => {
    res.status(200).render('editCollection', {
        title: 'Create Collection',
        data: {},
    });
}

const edit = async (req, res) => {
    const { id } = req.params;
    const data = await Collection.get(id);

    if (data === null) {
        res.redirect('/collections');
    } else {
        res.status(200).render('editCollection', {
            title: 'Edit Collection',
            data,
            query: req.query,
        })
    }
}

const saveNew = async (req, res) => {
    const data = {
        title: req.body.title,
        key: req.body.key,
        // columns: req.body.columns,
        // created: Date.now()
        tenantID: req.user.tenantID
    };

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("key", "required|string|noSpaces|notNumericOnly");

    let messages = { ...validation.errors };

    if (!('key' in messages) && await Collection.keyExists(data.key)) {
        messages.key = "Key already in use";
    }

    if (!isEmpty(messages)) {
        return res.status(400).send({
            success: false,
            validation: false,
            messages
        });
    }

    const newID = await Collection.add(data);
    if (newID === null) {
        return res.status(500).send({
            success: false,
            validation: true,
            messages: { error: 'Something went wrong while trying to save the collection. Please check the console for more information.' }
        });
    }
    return res.status(201).send({
        success: true,
        validation: true,
        newID
    });
}

const save = async (req, res) => {
    const { id } = req.params;

    const data = {
        title: req.body.title,
        key: req.body.key
    };

    const validation = new Validation(data);

    validation.validate("title", "required|string");
    validation.validate("key", "required|string|noSpaces|notNumericOnly");

    let messages = { ...validation.errors };

    if (!('key' in messages) && await Collection.keyChanged(id,data.key) && await Collection.keyExists(data.key)) {
        messages.key = "Key already in use";
    }

    if (!isEmpty(messages)) {
        return res.status(400).send({
            success: false,
            validation: false,
            messages
        });
    }

    const success = await Collection.update(id, data);

    if (success) {
        return res.status(201).send({
            validation: true,
            success: true,
        })
    } else {
        return res.status(500).send({
            success: false,
            validation: true,
            message: 'Something went wrong while trying to update the collection. Please check the console for more information.'
        });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await Collection.remove(id);

    if (success) {
        res.redirect('/collections?message=deleted');
    } else {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the collection. Please check the console for more information.'
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