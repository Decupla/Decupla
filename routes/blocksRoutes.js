const { Router } = require("express");
const blocksController = require('../controllers/blocksController');

const blocksRouter = Router();
blocksRouter.get('/create', blocksController.create); // Spezifische Route zuerst
blocksRouter.get('/edit/:id', blocksController.edit); // Spezifischere Route vor /:id
blocksRouter.get('/', blocksController.index);
blocksRouter.get('/:id', blocksController.get); // Allgemeinere Route zuletzt
blocksRouter.post('/', blocksController.saveNew);
blocksRouter.post('/instances', blocksController.saveNewInstance);
blocksRouter.put('/:id', blocksController.save);
blocksRouter.delete('/:id', blocksController.remove);

module.exports = blocksRouter;
