const {Router} = require("express");
const contentController = require("../controllers/contentController");
const checkRole = require('../middleware/checkRole');

const contentRouter = Router();
contentRouter.get('/',contentController.index);
contentRouter.get('/:id/blocks',contentController.getBlocks);
contentRouter.get('/create',checkRole('editContent'),contentController.create);
contentRouter.get('/edit/:id',checkRole('editContent'),contentController.edit);
contentRouter.delete('/:id',checkRole('editContent'),contentController.remove);
contentRouter.post('/',checkRole('editContent'),contentController.saveNew);
contentRouter.put('/:id',checkRole('editContent'),contentController.save);

module.exports = contentRouter;