const {Router} = require("express");
const collectionsController = require("../controllers/collectionsController");

const collectionRouter = Router();
collectionRouter.get('/',collectionsController.index);
collectionRouter.get('/create',collectionsController.create);
collectionRouter.get('/edit/:id',collectionsController.edit);
collectionRouter.post('/',collectionsController.saveNew);
collectionRouter.put('/:id',collectionsController.save);
collectionRouter.delete('/:id',collectionsController.remove);

module.exports = collectionRouter;