const Content = require('../models/content');
const Block = require('../models/block');
const BlockInstance = require('../models/blockInstance');
const User = require('../models/user');
const Role = require('../models/role');
const Validation = require('../helpers/Validation');
const isEmpty = require('../helpers/isEmpty');
const processUrl = require('../helpers/processUrl');

const index = async (req, res) => {
    const content = await Content.getAll();

    res.status(200).render('content', {
        title: 'Content',
        content,
        query: req.query
    });
}

const create = async (req, res) => {
    const blocks = await Block.getAll();

    res.status(200).render('editContent', {
        title: 'Create Content',
        blocks,
        data: {},
    });
}

const edit = async (req, res) => {
    const { id } = req.params;
    const blocks = await Block.getAll();

    const data = await Content.get(id);
    if (data === null) {
        return res.redirect('/content');
    }
    res.status(200).render('editContent', {
        title: 'Edit Content',
        data,
        blocks,
        query: req.query,
    });
}

const saveNew = async (req, res) => {
    const data = {
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        created: Date.now()
    };

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("status", "required");

    processUrl(data, validation, req.body.url, data.title);
    
    const messages = {...validation.errors};

    // if (!('url' in messages) && await Content.urlChanged(id,data.url) && await Content.urlExists(data.url)) {
    //     messages.url = "URL already in use";
    // }

    if (!('url' in messages) && await Content.urlExists(data.url)) {
        messages.url = "URL already in use";
    }

    if (!isEmpty(messages)) {
        return res.status(400).send({
            success: false,
            validation: false,
            url: data.url,
            messages
        });
    }

    const newID = await Content.add(data);
    if (newID === null) {
        return res.status(500).send({
            success: false,
            validation: true,
            messages: { error: 'Something went wrong while trying to save the content. Please check the console for more information.' }
        });
    }
    return res.status(201).send({
        success: true,
        validation: true,
        newID,
        url: data.url
    });
};


const save = async (req, res) => {
    const { id } = req.params;
    const data = {
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        id,
        updated: Date.now()
    };

    const validation = new Validation(data);
    validation.validate("title", "required|string");
    validation.validate("status", "required");
    validation.validate("id", "required|numeric");

    processUrl(data, validation, req.body.url, data.title);

    const messages = {...validation.errors};

    if (!('url' in messages) && await Content.urlChanged(id,data.url) && await Content.urlExists(data.url)) {
        messages.url = "URL already in use";
    }

    if (!isEmpty(messages)) {
        return res.status(400).send({
            success: false,
            messages,
            validation: false,
            success: false,
            url: data.url
        });
    }

    const success = await Content.update(id, data);
    if (success) {
        return res.status(201).send({
            success: true,
            validation: true,
            url: data.url
        });
    } else {
        return res.status(500).send({
            success: false,
            validation: true,
            messages: { error: 'Something went wrong while trying to update the content. Please check the console for more information.' }
        });
    }
};


const remove = async (req, res) => {
    const { id } = req.params;
    const success = await Content.remove(id);
    if (success) {
        const blocksSuccess = await BlockInstance.deleteByContent(id);
        if (blocksSuccess) {
            res.redirect('/content?message=deleted')
        } else {
            return res.status(500).render('error', {
                title: 'Error',
                message: 'Something went wrong while trying to delete the block instances. Please check the console for more information.'
            });
        }
    } else {
        return res.status(500).render('error', {
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
        if (block === null) {
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

// const allowEditingInstances = async () => {
//     try {
//         const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
//         const currentUserID =  tokenData.id;

//         const user = await User.get(currentUserID);
//         if(user===null){
//             return false;
//         }
//         const role = await Role.get(user.role)
//         if(role===null){
//             return false;
//         }
//         const perms = role.perms.split(',');
//         return perms.includes('manageBlockInstances');
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }

module.exports = {
    index,
    create,
    edit,
    saveNew,
    save,
    remove,
    getBlocks
}
