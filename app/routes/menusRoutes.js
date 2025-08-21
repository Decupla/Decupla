const {Router} = require("express");
const menusController = require("../controllers/menusController");

const menusRouter = Router();
menusRouter.get('/',menusController.index);
menusRouter.get('/create',menusController.create);
menusRouter.get('/:id',menusController.get);
menusRouter.get('/edit/:id',menusController.edit);
menusRouter.post('/',menusController.saveNew);
menusRouter.put('/:id',menusController.save)
menusRouter.delete('/:id',menusController.remove);

module.exports = menusRouter;