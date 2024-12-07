const { Router } = require("express");
const blocksController = require('../controllers/blocksController');

const blocksRouter = Router();
blocksRouter.get('/create', blocksController.create);
blocksRouter.get('/edit/:id', blocksController.edit);
blocksRouter.get('/', blocksController.index);
blocksRouter.get('/:id', blocksController.get);
blocksRouter.post('/', blocksController.saveNew);
blocksRouter.post('/instances', blocksController.saveNewInstance);
blocksRouter.put('/:id', blocksController.save);
blocksRouter.put('/instances/:id', blocksController.updateInstance);
blocksRouter.delete('/:id', blocksController.remove);

module.exports = blocksRouter;
