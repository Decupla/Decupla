const {Router} = require("express");
const menusController = require("../controllers/menusController");

const menusRouter = Router();
menusRouter.get('/',menusController.index);
menusRouter.get('/create',menusController.create);

module.exports = menusRouter;