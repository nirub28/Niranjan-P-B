const Comment=require('../models/Comment');
const Post=require('../models/Post');
const commentMailer=require('../mailers/comment_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
const Like = require('../models/Like');




module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user');
            //commentMailer.newComment(comment);
            let job=queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in sending job',err);
                    return;
                }
                console.log('job enqueued', job.id);

            })
            if (req.xhr){
                // Similar for comments to fetch the user's id!
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}

// module.exports.create= function(req,res){
//    post.findById(req.body.post , function(err, post){
//     if(post){
//         Comment.create({
//             content : req.body.content,
//             post : req.body.post,
//             user : req.user._id
//         },function(err, comment){
//             if(err){console.log('error in comments create');return}

//             post.comments.push(comment);
//             post.save();
//             req.flash('success' ,'Comment got Added');

//             res.redirect('/');
//         });
//     }
//    }); 
// }

// module.exports.destroy=function(req,res){
//     Comment.findById(req.params.id, function(err,comment){
//         if(comment.user == req.user.id){ //commented and requted to delte user is same
//             let postID=comment.post; // we need post for which under it we deleted comment above so in posts array we have to remove the comment
//             comment.remove();
//             post.findByIdAndUpdate(postID, { $pull:{comment:req.params.id}},function(err,post){ //$pull is giving by node to fetch and remove 
//                 req.flash('success' ,'Comment got Deleted');
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back'); 
//         }
//     });
// }

module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});


             // deleting likes of comment 
            await Like.deleteMany({likeable:comment, onModel:'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted and its comments deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}