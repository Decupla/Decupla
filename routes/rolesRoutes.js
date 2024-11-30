const {Router} = require("express");
const rolesController = require("../controllers/rolesController");

const contentRouter = Router();
contentRouter.get('/',rolesController.index);
contentRouter.get('/create',rolesController.create);
contentRouter.get('/edit/:id',rolesController.edit);
contentRouter.post('/',rolesController.saveNew);
contentRouter.put('/:id',rolesController.save);
module.exports = contentRouter;