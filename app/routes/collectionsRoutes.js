const {Router} = require("express");
const collectionsController = require("../controllers/collectionsController");

const collectionRouter = Router();
collectionRouter.get('/',collectionsController.index);
collectionRouter.get('/create',collectionsController.create);
collectionRouter.post('/',collectionsController.saveNew);

module.exports = collectionRouter;