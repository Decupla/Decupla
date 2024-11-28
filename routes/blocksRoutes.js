const {Router} = require("express");
const blocksController = require('../controllers/blocksController');

const blocksRouter = Router();
blocksRouter.get('/',blocksController.index);
blocksRouter.get('/add',blocksController.create);
blocksRouter.post('/save',blocksController.saveNew);

module.exports = blocksRouter;