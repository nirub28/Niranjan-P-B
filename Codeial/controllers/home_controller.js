const Post=require('../models/Post');
const User=require('../models/User');
const Friendship=require('../models/Friendship'); //change

module.exports.home= async function(req,res){
   // to get object of user and pass it so we can access name of user in display

   try{

      let posts = await Post.find({})
      .sort(`-CreatedAt`)     //sort acc to time of create
   .populate('user')         //extract user of post
   .populate({
      path:'comments',      // extract comment of post
      populate:{
         path:'user'       //extract user of comment
      },
      populate:{
         path:'likes'     //extract like of comment
      }
   }).populate('comments')
   .populate('likes');  //extract like of post
   //.populate('friendships'); //change
   
   let users=await User.find({});
   let friends = await Friendship.find({}); //change
        
    return res.render('home',{
      title:"Codeial | Home",
      posts: posts,
      all_users: users,   
      all_friends:friends  //change 
    });
}    


catch(err){
          console.log('Error', err);
          return;
   }
}   
//can create function with above syntax an export to use in routes