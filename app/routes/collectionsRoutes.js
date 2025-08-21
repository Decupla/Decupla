const {Router} = require("express");
const collectionsController = require("../controllers/collectionsController");

const collectionRouter = Router();
collectionRouter.get('/',collectionsController.index);

module.exports = collectionRouter;