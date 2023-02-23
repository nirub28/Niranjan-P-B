const express=require('express');
const router=express.Router();

const homeController= require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/users', require('./contact'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));


//console.log('this is loaded');
module.exports=router;

