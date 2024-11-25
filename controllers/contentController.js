const Content = require('../models/content');

const index = async (req,res) => {
    const content = await Content.getAll();

    res.render('content',{
        title: 'Content',
        content
    });
}

const add = (req,res) => {
    Content.add();
}

module.exports = {
    index,
    add
}
