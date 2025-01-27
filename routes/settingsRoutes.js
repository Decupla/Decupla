const {Router} = require("express");
const settingsController = require('../controllers/settingsController');
const startContentController = require('../controllers/startContentController');

const settingsRouter = Router();
settingsRouter.get('/', settingsController.index);
settingsRouter.get('/origins', settingsController.showAllowedOrigins);
settingsRouter.get('/origins/create', settingsController.createOrigin);
settingsRouter.get('/origins/edit/:id', settingsController.editOrigin);
settingsRouter.get('/start-content',startContentController.index);
settingsRouter.post('/origins',settingsController.saveNewOrigin);
settingsRouter.put('/start-content/save',startContentController.save);
settingsRouter.put('/origins/:id',settingsController.saveOrigin);
settingsRouter.delete('/origins/:id',settingsController.removeOrigin);

module.exports = settingsRouter;