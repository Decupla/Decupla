const Content = require('../models/content');
const Menus = require('../models/menu');
const BlockInstance = require('../models/blockInstance');

const getAllContent = async (req,res) => {
    const content = await Content.getAll();

    for(let i = 0; i < content.length; i++ ){
        const contentID = content[i].id;
        const blockInstances = await BlockInstance.getByContent(contentID);

        const blocks = [];

        blockInstances.forEach(instance => {
            const block = {
                blockID: instance.BlockID,
                instanceID: instance.id,
                output: JSON.parse(instance.output)
            }

            blocks.push(block);
        });

        content[i].blocks = blocks;
    }

    res.send(content);
}

module.exports = {
    getAllContent
}