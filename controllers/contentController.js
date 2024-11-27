const Content = require('../models/content');
const Validation = require('../helpers/Validation');

const index = async (req,res) => {
    const content = await Content.getAll();

    res.render('content',{
        title: 'Content',
        content
    });
}

const create = (req,res) => {
    res.render('addContent',{
        title: 'Create Content'
    });
}

const edit = async (req,res) => {
    const { id } = req.params;
    // get content data by id
    const data = await Content.get(id);
    res.render('editContent',{
        title: 'Edit Content',
        data
    });
}

const saveNew = (req,res) => {
    const data = {
        title: req.body.title,
        status: req.body.status
    }

    const validation = new Validation(data);
    validation.validate("title","required|string");
    validation.validate("status","required");
    if(validation.hasErrors()){
        res.status(400).send(validation.errors);
    } else {
        Content.add(data)
        res.status(201).redirect('/');
    }
}

const save = (req,res) => {
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
        Content.update(id,data);
        res.status(201).redirect('/');
    }
}

module.exports = {
    index,
    create,
    edit,
    saveNew,
    save
}
