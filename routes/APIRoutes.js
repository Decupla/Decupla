const { Router } = require("express");
// const apiController = require("../controllers/apiController");
const contentController = require("../controllers/contentController");

const APIRouter = Router(); 
APIRouter.get('/content/all', contentController.test);

module.exports = APIRouter;

