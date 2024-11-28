const Block = require('../models/block');
const Validation = require('../helpers/Validation');

const index = async (req,res) => {
    const blocks = await Block.getAll();

    res.render('Blocks',{
        title: 'Blocks',
        blocks,
        query: req.query
    })
}

const create = async (req,res) => {
    res.render('addBlock',{
        title: 'Create Block'
    });
}

const saveNew = async (req,res) => {
    const data = {
        title: req.body.title,
        input: '',
        status: req.body.status
    }

    const validation = new Validation(data);
    validation.validate("title","required|string");
    validation.validate("status","required");

    if(validation.hasErrors()){
        res.status(400).send(validation.errors);
    } else {
        const newID = await Block.add(data);
        res.status(201).redirect(`/blocks/edit/${newID}?message=saved`);
    }
}

module.exports = {
    index,
    create,
    saveNew
}