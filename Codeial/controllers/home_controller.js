const Post=require('../models/Post');
const User=require('../models/User');

module.exports.home=function(req,res){
   // to get object of user and pass it so we can access name of user in display
   Post.find({})
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   })
   .exec( function(err, posts){
      //console.log(posts);
     // //if(err){console.log('error in extracting posts');return;}
      User.find({}, function(err,users){
         return res.render('home',{
            title:"Codeial | Home",
            posts: posts,
            all_users: users
      });
     
      });

   })
         
}
//can create function with above syntax an export to use in routes