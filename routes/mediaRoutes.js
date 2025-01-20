const {Router} = require("express");
const mediaController = require('../controllers/mediaController');

const mediaRouter = Router();
mediaRouter.get('/',mediaController.index);
mediaRouter.get('/create',mediaController.create);
mediaRouter.post('/',mediaController.saveNew);

module.exports = mediaRouter;