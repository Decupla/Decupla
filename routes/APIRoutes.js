const { Router } = require("express");
const apiController = require("../controllers/apiController");
const invalidApiRouteHandler = require('../middleware/invalidApiRouteHandler');

const APIRouter = Router(); 
APIRouter.get('/content/all', apiController.getAllContent);
APIRouter.get('/content/:id', apiController.getContent);
APIRouter.use(invalidApiRouteHandler);

module.exports = APIRouter;

