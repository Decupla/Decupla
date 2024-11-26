const Content = require('../models/content');
const Validation = require('../helpers/Validation');

const index = async (req,res) => {
    const content = await Content.getAll();

    res.render('content',{
        title: 'Content',
        content
    });
}

const add = (req,res) => {
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
        res.status(300).send('Alles ok');
    }
}

module.exports = {
    index,
    add
}
