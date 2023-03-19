const passport=require('passport');
const googleStratergy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const env =require('./environment');


const User=require('../models/User');

// tell passport to use new stratergy for google login
passport.use(new googleStratergy({
    clientID:env.google_client_id,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_call_back_url,
},function(accessToken, refreshToken, profile, done) {
    //find user
    User.findOne({email: profile.emails[0].value }).exec(function(err, user) {
        if(err){console.log('error in google stratergy passport',err);return;}
         //user profile if active ggl acc or not -console.log(profile);
        if(user){
           // if user found  return
            return done(null,user);
        }else{
            //if not user found create a user
             // to create random pass as pass is mandatory to
             // create account and in google login we don't get pass from us so we use crypto
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')    
            },
            function(err,user){
                if(err){console.log('error in creating google stratergy passport',err);return;}
                return done(null,user);
            });
        }
      

     })
   }));


module.exports= passport;