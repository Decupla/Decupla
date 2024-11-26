const {Router} = require("express");
const contentController = require("../controllers/contentController");

const contentRouter = Router();
contentRouter.get('/',contentController.index);
contentRouter.get('/create',contentController.create);
contentRouter.get('/edit/:id',contentController.edit);
contentRouter.post('/save',contentController.saveNew);

module.exports = contentRouter;