const Validation = require('../helpers/Validation');
const Collection = require('../models/collection');
const isEmpty = require('../helpers/isEmpty');

const index = (req, res) => {
    res.status(200).render('collections', {
        title: 'Content',
        query: req.query
    });
}

const create = async (req, res) => {
    res.status(200).render('editCollection', {
        title: 'Create Collection',
        data: {},
    });
}

const saveNew = async (req, res) => {
    const data = {
        title: req.body.title,
        key: req.body.key,
        // columns: req.body.columns,
        // created: Date.now()
    };

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("key", "required");

    if (!isEmpty(validation.errors)) {
        return res.status(400).send({
            success: false,
            validation: false,
            messages: validation.errors
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

module.exports = {
    index,
    create,
    saveNew
}