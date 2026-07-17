const {Router} = require('express');
const router = Router();
const itemController = require('../controllers/itemControll');

router.post('/new', itemController.postItemCreate);
router.get('/new', itemController.getItemCreate);

module.exports = router;