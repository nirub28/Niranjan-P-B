//change whole file
const Friendship = require('../models/Friendship');

module.exports.addFriend= async function(req,res){

   try{
      
    const friendship = await Friendship.findOne({
        from_user: req.user._id,
        to_user: req.params.id
      }).exec();

    if(friendship){

        req.flash('success', 'You guys are already friends');
        return res.redirect('back');

    }

    else{let friend =await Friendship.create({
       

        from_user: req.user._id,
        to_user: req.params.id,
        name_touser: req.params.name
    });

       //console.log(friend);

      req.flash('success', 'Added as friend');

      return res.redirect('back');
    }
    
 

   }catch(err){
    console.log('Error in adding friend', err);
    return res.redirect('back');
   }
}

module.exports.removeFriend= async function(req,res){
    try{

        let friend=await Friendship.findById(req.params.id);

        friend.remove();

        req.flash('success', 'Removed Friend!');
        return res.redirect('back');
        

    }catch(err){
        console.log('Error in removing friend', err);
        return res.redirect('back');
    }
}