const Block = require('../models/block');
const Validation = require('../helpers/Validation');

const index = async (req, res) => {
    const blocks = await Block.getAll();

    res.render('Blocks', {
        title: 'Blocks',
        blocks,
        query: req.query
    })
}

const create = async (req, res) => {
    res.render('addBlock', {
        title: 'Create Block'
    });
}

const edit = async (req, res) => {
    const { id } = req.params;
    const data = await Block.get(id);
    if (data === null) {
        res.status(404).redirect('/blocks');
    } else {
        res.render('editBlock', {
            title: 'Edit Block',
            data,
            query: req.query
        })
    }
}

const saveNew = async (req, res) => {
    const data = {
        title: req.body.title,
        input: req.body.input,
        status: req.body.status
    }

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("status", "required");
    validation.validate("input", "string")

    if (validation.hasErrors()) {
        res.status(400).send(validation.errors);
    } else {
        const newID = await Block.add(data);
        //to do: change response for fetch
        // res.status(201).redirect(`/blocks/edit/${newID}?message=saved`);
        res.status(201).send({
            success: true,
            newID
        })
    }
}

const save = async (req, res) => {
    const { id } = req.params;
    const data = {
        title: req.body.title,
        status: req.body.status,
        id
    }

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("status", "required");
    validation.validate("id", "required|numeric");

    if (validation.hasErrors()) {
        return res.status(400).send(validation.errors);
    }
    const success = await Block.update(id, data);
    if(success){
        res.status(201).redirect(`/blocks/edit/${id}?message=saved`);
    } else {
        //to do: error page
        res.status(404).send('block to update not found');
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    await Block.remove(id);
    res.status(201).redirect('/blocks?message=deleted');
}

const get = async (req, res) => {
    const { id } = req.params;
    const block = await Block.get(id);
}

module.exports = {
    index,
    create,
    saveNew,
    save,
    edit,
    remove,
    get
}