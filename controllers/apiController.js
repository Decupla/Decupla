const Content = require('../models/content');
const Menu = require('../models/menu');
const BlockInstance = require('../models/blockInstance');
const Block = require('../models/block');
const Setting = require('../models/setting');

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

    content.blocks = blocks;

    res.status(200).send(content);
}

const getStartContent = async (req,res) => {
    const startContent = await Setting.get('startContent');

    if(startContent === null || startContent === 0){
        return res.status(404).send({ error: 'Selected start content could not be found' });
    }

    const content = await Content.get(startContent);
    if(content === null){
        return res.status(404).send({ error: 'Selected start content could not be found' });
    }


    const blockInstances = await BlockInstance.getByContent(content.id);

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

    content.blocks = blocks;

    res.status(200).send(content);
}

const getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.getAll();

        for (const menu of menus) {
            menu.entries = JSON.parse(menu.entries);
            menu.entries.sort((a, b) => a.priority - b.priority);

            for (const entry of menu.entries) {
                const content = await Content.get(entry.contentID);
                if (!content) {
                    continue;
                }
                entry.title = content.title;
                entry.url = content.url;
            }
        }

        res.status(200).send(menus);
    } catch (error) {
        console.error("Fehler beim Abrufen der Menüs:", error);
        res.status(500).send({ error: "Interner Serverfehler" });
    }
};


const getMenuById = async (req,res) => {
    const {id} = req.params;

    const menu = await Menu.get(id);

    if (menu===null) {
        return res.status(404).send({ error: `Menu with ID ${id} not found` });
    }

    menu.entries = JSON.parse(menu.entries);
    menu.entries.sort((a, b) => a.priority - b.priority);

    for (const entry of menu.entries) {
        const content = await Content.get(entry.contentID);
        if (!content) {
            continue;
        }
    
        entry.url = content.url;
        entry.title = content.title;
    }

    res.status(200).send(menu);
}

const getMenuByKey = async (req,res) => {
    const {key} = req.params;

    const menu = await Menu.getByKey(key);

    if(menu===null) {
        return res.status(404).send({ error: `Menu with Key '${key}' not found` });
    }

    menu.entries = JSON.parse(menu.entries);
    menu.entries.sort((a, b) => a.priority - b.priority);

    for (const entry of menu.entries) {
        const content = await Content.get(entry.contentID);
        if (!content) {
            continue;
        }
    
        entry.url = content.url;
        entry.title = content.title;
    }

    res.status(200).send(menu);
}

module.exports = {
    getAllContent,
    getContent,
    getStartContent,
    getAllMenus,
    getMenuById,
    getMenuByKey
}