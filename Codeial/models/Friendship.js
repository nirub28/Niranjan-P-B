const mongoose=require('mongoose');

const friendshipSchema=new mongoose.Schema({
    //the user who sent this request
     from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     name_touser:{
        type:String,
        ref:'User',
     }
},{
    timestamps:true
});

const Friendship=mongoose.model('Friendship', friendshipSchema);
module.exports =Friendship;