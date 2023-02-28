const Post = require('../models/Post');
//as we need to delete comments associated with with post, we import it
const Comment = require('../models/Comment');

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id
  }, function (err, post) {
    if (err) { console.log("Error is storing post"); return; }
    req.flash('success', 'Post Created');
    return res.redirect('back');
  });
}

module.exports.destroy = async function (req, res) {
  //.id means converting object id to string

  try{

    let post = await Post.findById(req.params.id);

  if (post.user == req.user.id) { //to check if logged in user and post user is same
    post.remove();

    await Comment.deleteMany({ post: req.params.id });//finding the post id and deleteting commets of it
    req.flash('success', 'Post and Associated comments Deleted!');
    return res.redirect('back');
  }
  else {
    req.flash('success', 'You cant delete post');
    return res.redirect('back');
  }

  }catch(err){
    req.flash('error', err);
    return;
  }
  

}