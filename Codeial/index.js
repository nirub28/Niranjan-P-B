const express = require('express');
const cookieParser = require('cookie-parser');

const dotEnv = require('dotenv');
dotEnv.config();

const env=require('./config/environment');
const logger=require('morgan');

const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//create session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-stratergy');
const  MongoStore = require('connect-mongo');

const sassMiddleware = require ('node-sass-middleware');
const flash = require('connect-flash');
const customMware= require('./config/middleware');
const  passportGoogle=require('./config/passport-google-oauth2-stratergy');

//set up chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets= require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is running on port 5000');


const path=require('path');

if(env.name =='devlopment'){

   app.use(sassMiddleware({
   src:path.join(__dirname, env.asset_path,'SCSS'),
   dest:path.join(__dirname, env.asset_path,'CSS'),
   debug:true,
   outputStyle:'exended',
   prefix:'/css'
    }));
}
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

//make uploads folder accesible to brow=swer
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options)); // using logs

app.use(expresslayouts);

//extract static files of each page
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



//use ejs view engine
app.set('view engine','ejs') ;
app.set('views','./views');


//creating a session
app.use(session({
   name:'Codeial',
   secret:env.session_cookie_key,
   saveUninitialized:false,
   resave:false,
   cookie:{
      maxAge:(1000*60*100)
   },

     store : new MongoStore({
      mongoUrl : "mongodb://127.0.0.1:27017/codeial_development",
      autoremove : "disabled",
  },function(err){
      console.log("error at mongo store",err || "connection established to store cookie");
  })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.SetAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use router
app.use('/', require('./routes'));

app.listen(port, function(err){
     if(err){
        console.log(`Error ${err}`);
        return;
     }

     console.log(`Server is up and running on port: ${port}`);
});