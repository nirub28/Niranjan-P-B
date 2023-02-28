const Post=require('../models/Post');
const User=require('../models/User');

module.exports.home= async function(req,res){
   // to get object of user and pass it so we can access name of user in display

   try{

      let posts = await Post.find({})
      .sort(`-CreatedAt`)
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   });   
    let users=await User.find({});
        
    return res.render('home',{
      title:"Codeial | Home",
      posts: posts,
      all_users: users
    });
}    


catch(err){
          console.log('Error', err);
          return;
   }
}   
//can create function with above syntax an export to use in routes