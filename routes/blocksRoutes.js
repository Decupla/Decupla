const { Router } = require("express");
const blocksController = require('../controllers/blocksController');
const checkRole = require('../middleware/checkRole');

const blocksRouter = Router();
blocksRouter.get('/create', checkRole('manageBlocks'), blocksController.create);
blocksRouter.get('/edit/:id', checkRole('manageBlocks'), blocksController.edit);
blocksRouter.get('/', checkRole('manageBlocks'), blocksController.index);
blocksRouter.get('/:id', blocksController.get);
blocksRouter.post('/', checkRole('manageBlocks'), blocksController.saveNew);
blocksRouter.post('/instances', blocksController.saveNewInstance);
blocksRouter.put('/:id', checkRole('manageBlocks'), blocksController.save);
blocksRouter.put('/instances/:id', blocksController.updateInstance);
blocksRouter.delete('/:id', checkRole('manageBlocks'), blocksController.remove);
blocksRouter.delete('/instances/:id', blocksController.removeInstance);

module.exports = blocksRouter;
