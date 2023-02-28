const User=require('../models/User');

module.exports.profile=function(req,res){
   User.findById(req.params.id , function(req,user){
      return res.render('user_profile',{
         title:"Profile",
         profile_user : user
   });
  
   });
}

module.exports.update=function(req,res){
   if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id, req.body, function(req,user){
            return res.redirect('back');
      });
   }else{
      return res.status(401).send("Unauthorized");
   }
}

//render sign in page
module.exports.signIn=function(req,res){

   if(req.isAuthenticated()){
      return res.redirect('/users/profile')
   }
   return res.render('user_sign_in',{
      title:"Sign | In"
   });
}
//render sign up page
module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile')
   }

   return res.render('user_sign_up',{
      title:"Sign | up"
   });
}

//get sign up data
module.exports.create=function(req,res){
   if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
   }
      
   User.findOne({email: req.body.email }, function(err,user){
      if(err){console.log('error in finding email');return}

      if(!user){
         User.create(req.body, function(err,user){
            if(err){console.log("error in creating user");return}

            return res.redirect('/users/sign-in');
         })
      }else{
         return res.redirect('back');
      }

      
   });

}

//get sign in data
module.exports.createSession=function(req,res){

   req.flash('success', 'Logged in Successfully');
     return res.redirect('/');
}

module.exports.destroySession=function(req,res){
//logout before reirecing this fuc given by passport
   
     req.logout(function(err){
      if(err){
         console.log('Unable to perform logout');
      }
     });req.flash('success', 'You have logged Out');
   return res.redirect('/');
}
