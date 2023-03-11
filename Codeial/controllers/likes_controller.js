const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like= require('../models/Like');

module.exports.toggleLike=async function(req,res){
    try{

        //like/toggle/id?=abcde&typr=Post
        let likeable;
        let deleted=false;

        if(req.query.id =='Post'){

            likeable= await Post.findById(req.query.id).populate('likes');

        }else{
            likeable= await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exists , it is find one b/c user can have only one like
         let existLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
         })

         // like already exists, then delete it
         if(existLike){
            likeable.likes.pull(existLike._id);
            likeable.save();

            existLike.remove();
            deleted=true;
         }else{
            //create a like
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });

            likeable.likes.push(newLike);
            likeable.save();
         }

         return res.json(200, {
            message:"Request sucessfull",
            data:{
                deleted:deleted
            }
         })


    }catch(err){
        console.log(err);
        return res.json(500, {
            message:'Internal Server error'
        })
    }
}