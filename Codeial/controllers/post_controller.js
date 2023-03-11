const Post = require('../models/Post');
//as we need to delete comments associated with with post, we import it
const Comment = require('../models/Comment');
const Like = require('../models/Like');

module.exports.create = async function (req, res) {
 try{
  let post = await Post.create({
    content: req.body.content,
    user: req.user._id
  });


  //checking if data sent is in json xhr format
    if(req.xhr){

      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      //
      post = await post.populate('user');

      return res.status(200).json({
        data:{
          post:post
          
        },
        message:'Post created'
      });
    }
    req.flash('success', 'Post Created');
    return res.redirect('back');
 
}catch(err){
  req.flash('error', err);
  return res.redirect('back');
}
}
module.exports.destroy = async function (req, res) {
  //.id means converting object id to string

  try{

    let post = await Post.findById(req.params.id);

  if (post.user == req.user.id) { //to check if logged in user and post user is same


    // deleting likes of post and its associated comments
    await Like.deleteMany({likeable: post, onModel:'Post'});
    await Like.deleteMany({_id:{$in: post.comments}});

    post.remove();

    await Comment.deleteMany({ post: req.params.id });//finding the post id and deleteting commets of it
    if(req.xhr){
      return res.status(200).json({
        data:{
          post_id:req.params.id
        },
        message:"Post Delete"
      });
    }
    req.flash('success', 'Post and Associated comments Deleted!');
    return res.redirect('back');
  }
  else {
    req.flash('success', 'You cant delete post');
    return res.redirect('back');
  }

  }catch(err){
    req.flash('error', err);
    return res.redirect('back');
  }
  

}