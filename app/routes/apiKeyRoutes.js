const {Router} = require("express");
const apiKeysController = require('../controllers/apiKeysController');

const apiKeysRouter = Router();
apiKeysRouter.get('/',apiKeysController.index);
apiKeysRouter.get('/create',apiKeysController.create);
apiKeysRouter.get('/edit/:id',apiKeysController.edit);
apiKeysRouter.post('/',apiKeysController.saveNew);
apiKeysRouter.put('/:id',apiKeysController.save);
apiKeysRouter.delete('/:id',apiKeysController.remove);

module.exports = apiKeysRouter;
