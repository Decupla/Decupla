const {Router} = require("express");
const settingsController = require('../controllers/settingsController');

const settingsRouter = Router();
settingsRouter.get('/',settingsController.index);

module.exports = settingsRouter;