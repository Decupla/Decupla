const {Router} = require("express");
const blocksController = require('../controllers/blocksController');

const blocksRouter = Router();
blocksRouter.get('/',blocksController.index);
blocksRouter.get('/create',blocksController.create);
blocksRouter.get('/edit/:id',blocksController.edit);
blocksRouter.post('/save',blocksController.saveNew);
blocksRouter.put('/save/:id',blocksController.save);
blocksRouter.delete('/delete/:id',blocksController.remove);

module.exports = blocksRouter;