const Content = require('../models/content');
const Menu = require('../models/menu');
const BlockInstance = require('../models/blockInstance');
const Block = require('../models/block');

const getAllContent = async (req, res) => {
    const content = await Content.getAllPublished();

    for (let i = 0; i < content.length; i++) {
        const contentID = content[i].id;
        const blockInstances = await BlockInstance.getByContent(contentID);

        const blocks = [];

        for (const instance of blockInstances) {
            const blockKey = await Block.getKey(instance.blockID);

            const blockData = {
                instanceID: instance.id,
                blockID: instance.blockID,
                blockKey,
                priority: instance.priority,
                output: JSON.parse(instance.output),
            };

            blocks.push(blockData);
        }

        content[i].blocks = blocks;
    }

    res.status(200).send(content);
};

const getContent = async (req,res) => {
    const {id} = req.params;

    const content = await Content.get(id);

    if (content===null) {
        return res.status(404).send({ error: `Content with ID ${id} not found` });
    }

    const blockInstances = await BlockInstance.getByContent(content.id);

    const blocks = [];

    blockInstances.forEach(instance => {
        const block = {
            blockID: instance.BlockID,
            instanceID: instance.id,
            key: instance.key,
            output: JSON.parse(instance.output)
        }

        blocks.push(block);
    });

    content.blocks = blocks;

    res.status(200).send(content);
}

const getAllMenus = async (req,res) => {
    const menus = await Menu.getAll();
    menus.forEach((menu)=>{
        menu.entries = JSON.parse(menu.entries);
    })
    res.status(200).send(menus);
}

const getMenuById = async (req,res) => {
    const {id} = req.params;

    const menu = await Menu.get(id);

    if (menu===null) {
        return res.status(404).send({ error: `Menu with ID ${id} not found` });
    }

    menu.entries = JSON.parse(menu.entries);
    res.status(200).send(menu);
}

const getMenuByKey = async (req,res) => {
    const {key} = req.params;

    const menu = await Menu.getByKey(key);

    if(menu===null) {
        return res.status(404).send({ error: `Menu with Key '${key}' not found` });
    }

    menu.entries = JSON.parse(menu.entries);
    res.status(200).send(menu);
}

module.exports = {
    getAllContent,
    getContent,
    getAllMenus,
    getMenuById,
    getMenuByKey
}