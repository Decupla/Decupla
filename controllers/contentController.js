const Content = require('../models/content');
const Block = require('../models/block');
const BlockInstance = require('../models/blockInstance');
const Validation = require('../helpers/Validation');

const index = async (req, res) => {
    const content = await Content.getAll();

    res.render('content', {
        title: 'Content',
        content,
        query: req.query
    });
}

const create = async (req, res) => {
    const blocks = await Block.getAll();

    res.render('addContent', {
        title: 'Create Content',
        blocks,
        data: {}
    });
}

const edit = async (req, res) => {
    const { id } = req.params;
    const blocks = await Block.getAll();

    const data = await Content.get(id);
    if (data === null) {
        return res.status(404).redirect('/content');
    }
    res.render('addContent', {
        title: 'Edit Content',
        data,
        blocks,
        query: req.query
    });
}

const saveNew = async (req, res) => {
    const data = {
        title: req.body.title,
        status: req.body.status
    };

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("status", "required");
    if (validation.hasErrors()) {
        return res.status(400).send({
            success: false,
            message: validation.errors
        });
    } else {
        const newID = await Content.add(data);
        if (newID === null) {
            return res.status(500).send({
                success: false,
                message: 'Something went wrong while trying to save the content. Please check the console for more information.'
            });
        }
        return res.status(201).send({
            success: true,
            newID
        });
    }
}

const save = async (req, res) => {
    const { id } = req.params;
    const data = {
        title: req.body.title,
        status: req.body.status,
        id
    };

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("status", "required");
    validation.validate("id", "required|numeric");
    if (validation.hasErrors()) {
        return res.status(400).send({
            success: false,
            message: validation.errors
        });
    }
    const success = await Content.update(id, data);
    if (success) {
        return res.status(201).send({
            success: true,
        });
    } else {
        return res.status(404).send({
            success: false,
            message: 'Something went wrong while trying to update the content. Please check the console for more information.'
        });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await Content.remove(id);
    if (success) {
        return res.status(201).redirect('/content?message=deleted'); 
    } else {
        return res.status(404).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the content. Please check the console for more information.'
        });
    }
}

const getBlocks = async (req, res) => {
    const { id } = req.params;
    const blockInstances = await BlockInstance.getByContent(id);

    if (blockInstances === null) {
        return res.status(500).send({
            success: false,
            message: 'Something went wrong while trying to get the block. Please check the console for more information.'
        });
    }

    for (const instance of blockInstances) {
        const block = await Block.get(instance.blockID);
        if(block===null){
            return res.status(500).send({
                success: false,
                message: 'Block for BlockInstance not found.'
            });
        }
        instance.title = block.title;
    }

    return res.status(200).send({
        success: true,
        blocks: blockInstances
    });
};

module.exports = {
    index,
    create,
    edit,
    saveNew,
    save,
    remove,
    getBlocks
}
