const {Router} = require("express");
const settingsController = require('../controllers/settingsController');

const settingsRouter = Router();
settingsRouter.get('/', settingsController.index);
settingsRouter.get('/origins', settingsController.showAllowedOrigins);
settingsRouter.get('/origins/create', settingsController.createOrigin);
settingsRouter.post('/origins',settingsController.saveNewOrigin);

module.exports = settingsRouter;