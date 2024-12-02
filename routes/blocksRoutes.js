const {Router} = require("express");
const blocksController = require('../controllers/blocksController');

const blocksRouter = Router();
blocksRouter.get('/',blocksController.index);
blocksRouter.get('/:id',blocksController.get);
blocksRouter.get('/create',blocksController.create);
blocksRouter.get('/edit/:id',blocksController.edit);
blocksRouter.post('/',blocksController.saveNew);
blocksRouter.put('/:id',blocksController.save);
blocksRouter.delete('/:id',blocksController.remove);

module.exports = blocksRouter;