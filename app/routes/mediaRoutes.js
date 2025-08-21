const {Router} = require("express");
const mediaController = require('../controllers/mediaController');

const mediaRouter = Router();
mediaRouter.get('/',mediaController.index);
mediaRouter.get('/all',mediaController.getAll);
mediaRouter.get('/create',mediaController.create);
mediaRouter.get('/edit/:id',mediaController.edit);
mediaRouter.post('/',mediaController.saveNew);
mediaRouter.put('/:id',mediaController.save);
mediaRouter.delete('/:id',mediaController.remove);

module.exports = mediaRouter;