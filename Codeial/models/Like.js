const mongoose=require('mongoose');

const LikeSchema=new mongoose.Schema({
      user:{
        type: mongoose.Schema.ObjectId
      },
      likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
       refPath: 'onModel'
      },
      onModel:{
        type: String,
        require: true,
        enum :['Post','Comment']
      }
},{
    timestamps:true
});

const Like=mongoose.model('Like', LikeSchema);
module.exports =Like;
