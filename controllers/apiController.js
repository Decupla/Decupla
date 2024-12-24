const Content = require('../models/content');
const Menus = require('../models/menu');
const BlockInstance = require('../models/blockInstance');

const getAllContent = async (req,res) => {
    const content = await Content.getAllPublished();

    for(let i = 0; i < content.length; i++ ){
        const contentID = content[i].id;
        const blockInstances = await BlockInstance.getByContent(contentID);

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

        content[i].blocks = blocks;
    }

    res.status(200).send(content);
}

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

module.exports = {
    getAllContent,
    getContent
}