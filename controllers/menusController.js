const Content = require('../models/content');

const index = (req,res) => {
    res.status(200).render('menus', {
        title: 'Menus',
        query: req.query
    })
}

const create = async (req,res) => {
    const content = await Content.getAll();

    res.status(200).render('editMenu', {
        title: 'Create Menu',
        data: {},
        content
    });
}

module.exports = {
    index,
    create
}