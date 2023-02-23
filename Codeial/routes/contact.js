const express=require('express');
const router=express.Router();

const contactController= require('../controllers/contact_controller');

router.get('/contact', contactController.contact);

//onsole.log('Contact page is loaded');
module.exports=router;