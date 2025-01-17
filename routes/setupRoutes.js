const {Router} = require("express");
const setupController = require("../controllers/setupController");

const setupRouter = Router();
setupRouter.get('/', setupController.index);
setupRouter.post('/', setupController.validateSetup);

module.exports = setupRouter;