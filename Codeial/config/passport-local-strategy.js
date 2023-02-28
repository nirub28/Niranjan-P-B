const passport=require('passport');
//connecting to stratergy in passport .local
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/User');

//connect to startergy and make user name as email and validate pass
passport.use(new LocalStrategy({
     usernameField:'email',
     passReqToCallback:true
},
   function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error', err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);
    });
   }

));

passport.serializeUser(function(user,done){
        done(null, user.id);
});

passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if(err){
            console.log('error in delse');
            return done(err);
        }

        return done(null,user);
    });

});


//to check user aythenticated or not
passport.checkAuthentication=function(req,res,next){
    //if yes then move to next excecution
     if(req.isAuthenticated()){
        return next();
     }

   
// else return to sign-in
     return res.redirect('/users/sign-in');
} 

//req.user has current signed user, so we need to givr this user views access
passport.SetAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
     }

     next();
}

module.exports=passport;