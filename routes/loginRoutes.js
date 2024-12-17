const {Router} = require("express");
const loginController = require("../controllers/loginController");

const loginRouter = Router();
loginRouter.get('/',loginController.index);
loginRouter.get('/token',loginController.getAuthToken);
loginRouter.post('/',loginController.validateLogin);

module.exports = loginRouter;