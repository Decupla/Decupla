const {Router} = require("express");
const settingsController = require('../controllers/settingsController');

const settingsRouter = Router();
settingsRouter.get('/', settingsController.index);
settingsRouter.get('/origins', settingsController.showAllowedOrigins);
settingsRouter.get('/origins/create', settingsController.createOrigin);
settingsRouter.get('/origins/edit/:id', settingsController.editOrigin);
settingsRouter.post('/origins',settingsController.saveNewOrigin);
settingsRouter.put('/origins/:id',settingsController.saveOrigin);

module.exports = settingsRouter;