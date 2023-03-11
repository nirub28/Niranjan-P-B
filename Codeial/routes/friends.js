//change whole file
const express=require('express');
const router=express.Router();
const friendsController=require('../controllers/friends_controller');



router.use('/add-friend/:id/:name', friendsController.addFriend);
router.use('/remove-friend/:id', friendsController.removeFriend);

module.exports=router;