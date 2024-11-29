const {Router} = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = Router();
usersRouter.get('/',usersController.index);
usersRouter.get('/create',usersController.create);
usersRouter.get('/edit/:id',usersController.edit);
usersRouter.post('/save',usersController.saveNew);
usersRouter.put('/save/:id',usersController.save);
usersRouter.delete('/:id',usersController.remove)

module.exports = usersRouter;