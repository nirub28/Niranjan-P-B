module.exports.index=function(req,res){
    return res.json(200, {
            message :" v2 List of Posts",
            posts:[]
    })

}