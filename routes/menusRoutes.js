const {Router} = require("express");
const menusController = require("../controllers/menusController");

const menusRouter = Router();
menusRouter.get('/',menusController.index);
menusRouter.get('/create',menusController.create);
menusRouter.post('/',menusController.saveNew);

module.exports = menusRouter;