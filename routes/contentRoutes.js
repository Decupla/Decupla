const {Router} = require("express");
const contentController = require("../controllers/contentController");

const contentRouter = Router();
contentRouter.get('/',contentController.index);
contentRouter.get('/create',contentController.create);
contentRouter.get('/edit/:id',contentController.edit);
contentRouter.delete('/delete/:id',contentController.remove);
contentRouter.post('/save',contentController.saveNew);
contentRouter.put('/save/:id',contentController.save);

module.exports = contentRouter;