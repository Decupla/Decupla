const { Router } = require("express");
const apiController = require("../controllers/apiController");
const invalidApiRouteHandler = require('../middleware/invalidApiRouteHandler');

const APIRouter = Router(); 
APIRouter.get('/content/all', apiController.getAllContent);
APIRouter.get('/content/start', apiController.getStartContent);
APIRouter.get('/content/:id', apiController.getContent);
APIRouter.get('/menus/all', apiController.getAllMenus);
APIRouter.get('/menus/:id(\\d+)', apiController.getMenuById);
APIRouter.get('/menus/:key([a-zA-Z0-9-]+)', apiController.getMenuByKey);
APIRouter.use(invalidApiRouteHandler);

module.exports = APIRouter;

