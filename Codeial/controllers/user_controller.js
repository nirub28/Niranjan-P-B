const User=require('../models/User');

const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
   User.findById(req.params.id , function(req,user){
      return res.render('user_profile',{
         title:"Profile",
         profile_user : user
   });
  
   });
}

module.exports.update= async function(req,res){
   // if(req.user.id == req.params.id){
   //    User.findByIdAndUpdate(req.params.id, req.body, function(req,user){
   //          return res.redirect('back');
   //    });
   // }else{
   //    return res.status(401).send("Unauthorized");
   // }
   if(req.user.id == req.params.id){
      try{
         let user=await User.findById(req.params.id);
         User.uploadedAvatar(req,res ,function(err){
            if(err){console.log('Multer error',err)}
            
            user.name=req.body.name;
            user.email=req.body.email;
            //evertime user may no upload pic so if uploaded then only check
            if(req.file){

               //to delete avatar if already present
               if(user.avatar){
                  fs.unlinkSync(path.join(__dirname, '..', user.avatar));
               }

               //this will save path of file uploaded to avatar field in the user
               user.avatar=User.avatarPath + '/' + req.file.filename;
            }

            user.save();
            return res.redirect('back');

         })

      }catch(error){
         req.flash('error', error);
         return res.redirect('back');
      }

   }else{
      req.flash('error', 'UnAuthorized');
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
      req.flash('error', 'Mismatch pass');
      return res.redirect('back');
   }
      
   User.findOne({email: req.body.email }, function(err,user){
      if(err){console.log('error in finding email');return}

      if(!user){
         User.create(req.body, function(err,user){
            if(err){console.log("error in creating user");return}
            req.flash('success', 'New User created');
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
