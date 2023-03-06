const Post=require('../../../models/Post');
const Comment=require('../../../models/Comment');

module.exports.index= async function(req,res){

    let posts = await Post.find({})
      .sort(`-CreatedAt`)
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   }); 

    return res.json(200, {
            message :" V1 list of Posts",
            posts:posts
    })

}

module.exports.destroy = async function (req, res) {
    //.id means converting object id to string
  
    try{
      
      let post = await Post.findById(req.params.id);
      if(post.user == req.user.id){
      post.remove();
  
      await Comment.deleteMany({ post: req.params.id });//finding the post id and deleteting commets of it
      return res.json(200, {
        message: "Post and its associated comments deleted"
     });
    }else{
      return res.json(401, {
         message: "You can't delete the post"
      });
    }
   } 
     catch(err){
        return res.json(200, {
            message: "Error in deleting post"
         });
      
    }

}