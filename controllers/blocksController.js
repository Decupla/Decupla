const Block = require('../models/block');
const BlockInstance = require('../models/blockInstance');
const Validation = require('../helpers/Validation');
const isEmpty = require('../helpers/isEmpty');

const index = async (req, res) => {
    const blocks = await Block.getAll();

    res.status(200).render('blocks', {
        title: 'Blocks',
        blocks,
        query: req.query
    })
}

const create = async (req, res) => {
    res.status(200).render('editBlock', {
        title: 'Create Block',
        data: {}
    });
}

const edit = async (req, res) => {
    const { id } = req.params;
    const data = await Block.get(id);
    if (data === null) {
        res.redirect('/blocks');
    } else {
        res.status(200).render('editBlock', {
            title: 'Edit Block',
            data,
            query: req.query
        })
    }
}

const saveNew = async (req, res) => {
    const data = {
        title: req.body.title,
        key: req.body.key,
        input: req.body.input,
        created: Date.now()
    }

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("key", "required|string|noSpaces");
    validation.validate("input", "string");
    
    let messages = {...validation.errors};

    if (!('key' in messages) && await Block.keyExists(data.key)) {
        messages.key = "Key already in use";
    }

    if (!isEmpty(messages)) {
        res.status(400).send(
            {
                validation: false,
                messages,
                success: false
            }
        );
    } else {
        const newID = await Block.add(data);
        if (newID === null) {
            return res.status(500).send({
                validation: true,
                success: false,
                message: 'Something went wrong while trying to save the block. Please check the console for more information.'
            })
        }
        res.status(201).send({
            validation: true,
            success: true,
            newID
        })
    }
}

const save = async (req, res) => {
    const { id } = req.params;
    const data = {
        title: req.body.title,
        key: req.body.key,
        input: req.body.input,
        id,
        updated: Date.now()
    }

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("id", "required|numeric");
    validation.validate("key", "required|string|noSpaces");

    let messages = {...validation.errors};

    if (!('key' in messages) && await Block.keyChanged(id,data.key) && await Block.keyExists(data.key)) {
        messages.key = "Key already in use";
    }

    if (!isEmpty(messages)) {
        return res.status(400).send(
            {
                validation: false,
                messages,
                success: false
            }
        );
    }
    const success = await Block.update(id, data);
    if (success) {
        return res.status(201).send({
            validation: true,
            success: true,
        })
    } else {
        return res.status(500).send({
            success: false,
            validation: true,
            message: 'Something went wrong while trying to update the block. Please check the console for more information.'
        });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    const success = await Block.remove(id);
    if (success) {
        const instancesSuccess = await BlockInstance.deleteByBlock(id);
        if (instancesSuccess) {
            return res.redirect('/blocks?message=deleted');
        } else {
            res.status(500).render('error', {
                title: 'Error',
                message: 'Something went wrong while trying to delete the block instance. Please check the console for more information.'
            });
        }
        // to do: else?
    } else {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Something went wrong while trying to delete the block. Please check the console for more information.'
        });
    }
}

const get = async (req, res) => {
    const { id } = req.params;
    const block = await Block.get(id);
    if (block === null) {
        return res.status(404).send({
            success: false,
            message: 'Something went wrong while trying to get the block. Please check the console for more information.'
        })
    }
    res.status(200).send({
        success: true,
        block
    })
}

// const getByKey = async (req, res) => {
//     const { key } =  req.params;
//     const block = await Block.getByKey(key);
//     if (block === null) {
//         return res.status(404).send({
//             success: false,
//             message: `Block with key "${key}" not found.`
//         })
//     }
//     res.status(200).send({
//         success: true,
//         block
//     })
// }

const saveNewInstance = async (req, res) => {

    const data = {
        contentID: req.body.contentID,
        output: req.body.output,
        blockID: req.body.blockID,
        priority: req.body.priority
    }

    const validation = new Validation(data);
    validation.validate("contentID", "required|numeric");
    validation.validate("output", "required|string");
    validation.validate("blockID", "required|numeric");
    validation.validate("priority", "required|numeric");

    if (validation.hasErrors()) {
        return res.status(400).send({
            success: false,
            message: validation.errors
        });
    } else {
        const newID = await BlockInstance.add(data);
        if (newID === null) {
            return res.status(500).send({
                success: false,
                message: 'Something went wrong while trying to update the block instance. Please check the console for more information.'
            })
        }
        res.status(201).send({
            success: true,
            newID
        })
    }
}

const updateInstance = async (req, res) => {
    const { id } = req.params;

    const data = {
        contentID: req.body.contentID,
        output: req.body.output,
        blockID: req.body.blockID,        
        priority: req.body.priority
    }

    const validation = new Validation(data);
    validation.validate("contentID", "required|numeric");
    validation.validate("output", "required|string");
    validation.validate("blockID", "required|numeric");
    validation.validate("priority", "required|numeric");

    if (validation.hasErrors()) {
        return res.status(400).send({
            success: false,
            message: validation.errors
        });
    }
    const success = await BlockInstance.update(id, data);
    if (success) {
        res.status(201).send({
            success: true,
        })
    } else {
        res.status(500).send({
            success: false,
            message: 'Something went wrong while trying to update the block instance. Please check the console for more information.'
        });
    }
}

const removeInstance = async (req, res) => {
    const { id } = req.params;

    const success = await BlockInstance.remove(id);
    if (success) {
        res.status(201).send({
            success: true,
        })
    } else {
        res.status(500).send({
            success: false,
            message: 'Something went wrong while trying to delete the block instance. Please check the console for more information.'
        });
    }
}

module.exports = {
    index,
    create,
    saveNew,
    save,
    edit,
    remove,
    get,
    saveNewInstance,
    updateInstance,
    removeInstance
}