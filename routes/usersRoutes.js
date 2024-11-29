const {Router} = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = Router();
usersRouter.get('/',usersController.index);
usersRouter.get('/create',usersController.create);
usersRouter.post('/save',usersController.saveNew);

module.exports = usersRouter;