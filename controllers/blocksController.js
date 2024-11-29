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

const edit = async (req,res) => {
    const { id } = req.params;
    const data = await Block.get(id);
    res.render('editBlock',{
        title: 'Edit Block',
        data,
        query: req.query
    })
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

const save = async (req,res) => {
    const { id } = req.params;
    const data = {
        title: req.body.title,
        status: req.body.status,
        id
    }

    const validation = new Validation(data);
    validation.validate("title","required|string");
    validation.validate("status","required");
    validation.validate("id","required|numeric");

    if(validation.hasErrors()){
        res.status(400).send(validation.errors);
    } else {
        Block.update(id,data);
        res.status(201).redirect(`/blocks/edit/${id}?message=saved`);
    }
}

const remove = async (req,res) => {
    const { id } = req.params;
    await Block.remove(id);
    res.status(201).redirect('/blocks?message=deleted');
}

module.exports = {
    index,
    create,
    saveNew,
    save,
    edit,
    remove
}