const Content = require('../models/content');

const index = (req,res) => {
    const content = Content.getAll();

    res.render('content',{
        title: 'Content'
    });
}

const add = (req,res) => {
    Content.add();
}

module.exports = {
    index,
    add
}
