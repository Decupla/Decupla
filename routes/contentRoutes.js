const {Router} = require("express");
const contentController = require("../controllers/contentController");

const contentRouter = Router();
contentRouter.get('/',contentController.index);
contentRouter.post('/add',contentController.add);

module.exports = contentRouter;