const {Router} = require("express");
const collectionsController = require("../controllers/collectionsController");

const collectionRouter = Router();
collectionRouter.get('/',collectionsController.index);
collectionRouter.get('/create',collectionsController.create);
collectionRouter.post('/',collectionsController.saveNew);
collectionRouter.delete('/:id',collectionsController.remove);

module.exports = collectionRouter;