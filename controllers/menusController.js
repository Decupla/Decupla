const Content = require('../models/content');

const index = (req,res) => {
    res.render('menus', {
        title: 'Menus',
        query: req.query
    })
}

const create = async (req,res) => {
    const content = await Content.getAll();

    res.render('editMenu', {
        title: 'Create Menu',
        data: {},
        content
    });
}

module.exports = {
    index,
    create
}