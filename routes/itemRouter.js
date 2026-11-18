const {Router} = require('express');
const itemRouter = Router();
const itemController = require('../controllers/itemControll');

itemRouter.post('/new', itemController.postItemCreate);

itemRouter.get('/new', itemController.getItemCreate);

itemRouter.post('/:id', itemController.deleteItem); // Route to handle item deletion

itemRouter.get('/filter', itemController.itemFilter); // Route to handle item filtering
module.exports = itemRouter;