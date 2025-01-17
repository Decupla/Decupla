const {Router} = require("express");
const logoutController = require("../controllers/logoutController");

const logoutRouter = Router();
logoutRouter.get('/',logoutController.index);

module.exports = logoutRouter;