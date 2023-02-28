const Comment=require('../models/Comment');
const post=require('../models/Post');

module.exports.create= function(req,res){
   post.findById(req.body.post , function(err, post){
    if(post){
        Comment.create({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        },function(err, comment){
            if(err){console.log('error in comments create');return}

            post.comments.push(comment);
            post.save();
            req.flash('success' ,'Comment got Added');

            res.redirect('/');
        });
    }
   }); 
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){ //commented and requted to delte user is same
            let postID=comment.post; // we need post for which under it we deleted comment above so in posts array we have to remove the comment
            comment.remove();
            post.findByIdAndUpdate(postID, { $pull:{comment:req.params.id}},function(err,post){ //$pull is giving by node to fetch and remove 
                req.flash('success' ,'Comment got Deleted');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back'); 
        }
    });
}