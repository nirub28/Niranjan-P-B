const mongoose=require('mongoose');

const multer =require('multer');
const path=require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema =new mongoose.Schema({
      
    email:{
        type:String,
        require:true,
        unique:true
    },
    name:{
        type:String,
        require:true       
    },
    password:{
        type:String,
        require:true       
    },
    avatar:{
        type:String
    },
    friendships:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friendship'
    }]
},{
    timestamps:true
});

//to store file 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
    //stativ methods pulicaly available after using avatar
    userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
    userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model('User',userSchema);
module.exports=User;