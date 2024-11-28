const {Router} = require("express");
const blocksController = require('../controllers/blocksController');

const blocksRouter = Router();
blocksRouter.get('/',blocksController.index);
blocksRouter.get('/add',blocksController.create);
blocksRouter.get('/edit/:id',blocksController.edit);
blocksRouter.post('/save',blocksController.saveNew);
blocksRouter.put('/save/:id',blocksController.save);

module.exports = blocksRouter;