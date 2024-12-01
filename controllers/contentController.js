const Content = require('../models/content');
const Validation = require('../helpers/Validation');

const index = async (req,res) => {
    const content = await Content.getAll();

    res.render('content',{
        title: 'Content',
        content,
        query: req.query
    });
}

const create = (req,res) => {
    res.render('addContent',{
        title: 'Create Content'
    });
}

const edit = async (req,res) => {
    const { id } = req.params;

    const data = await Content.get(id);
    if(data===null){
        res.status(404).redirect('/content');
    }
    res.render('editContent',{
        title: 'Edit Content',
        data,
        query: req.query
    });
}

const saveNew = async (req,res) => {
    const data = {
        title: req.body.title,
        status: req.body.status
    }

    const validation = new Validation(data);
    validation.validate("title","required|string");
    validation.validate("status","required");
    if(validation.hasErrors()){
        messages = validation.getErrors();
        res.render('addContent',{
            title: 'Create Content',
            messages
        })
    } else {
        const newID = await Content.add(data);
        res.status(201).redirect(`/content/edit/${newID}?message=saved`);
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
        res.status(201).redirect(`/content/edit/${id}?message=saved`);
    }
}

const remove = async (req,res) => {
    const { id } = req.params;
    await Content.remove(id);
    res.status(201).redirect('/content?message=deleted');
}

module.exports = {
    index,
    create,
    edit,
    saveNew,
    save,
    remove
}
