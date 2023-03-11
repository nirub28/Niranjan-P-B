const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController= require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);


router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);


router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession);

router.get('/sign-out', userController.destroySession);

//change
router.use('/friends', require('./friends'));


//as profile don't have email field we need fetch separatly
router.get('/auth/google', passport.authenticate('google', {scope :['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), userController.createSession);

//console.log('this is loaded');
module.exports=router;