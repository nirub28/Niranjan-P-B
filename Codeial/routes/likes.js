const express=require('express');
const router=express.Router();
const likesController=require('../controllers/likes_controller');


//use post request and test it
router.get('/toggle', likesController.toggleLike);

module.exports=router;