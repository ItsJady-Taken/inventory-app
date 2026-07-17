const {Router} = require('express');
const itemRouter = Router();
const itemController = require('../controllers/itemControll');

itemRouter.post('/new', itemController.postItemCreate);
itemRouter.get('/new', itemController.getItemCreate);

module.exports = itemRouter;