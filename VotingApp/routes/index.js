var express = require('express');
var router = express.Router();
var controller = require('../controller/indexController')
/* GET home page. */
router.get('/', controller.home)
router.get('/clovis', controller.default)
router.get('/users', controller.show)
router.get('/authenticate/:name/:password', controller.authenticate)

module.exports = router;
