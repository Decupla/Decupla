const {Router} = require("express");
const collectionController = require("../controllers/collectionController");

const collectionRouter = Router();
collectionRouter.get('/',collectionController.index);

module.exports = collectionRouter;