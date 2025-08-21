const {Router} = require("express");
const startContentController = require('../controllers/startContentController');

const startContentRouter = Router();
startContentRouter.get('/',startContentController.index);
startContentRouter.put('/',startContentController.save);

module.exports = startContentRouter;