const User=require('../models/User');

module.exports.profile=function(req,res){
   return res.render('user_profile',{
      title:"Profile"
   });
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
     return res.redirect('/');
}

module.exports.destroySession=function(req,res){
//logout before reirecing this fuc given by passport
     req.logout(function(err){
      if(err){
         console.log('Unable to perform logout');
      }
     });
   return res.redirect('/');
}