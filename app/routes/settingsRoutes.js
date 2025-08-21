const {Router} = require("express");
const settingsController = require('../controllers/settingsController');
const apiKeysRouter = require('./apiKeyRoutes');
const startContentRouter = require('./startContentRoutes');

const settingsRouter = Router();
settingsRouter.get('/', settingsController.index);
settingsRouter.use('/api-keys',apiKeysRouter);
settingsRouter.use('/start-content',startContentRouter);

module.exports = settingsRouter;