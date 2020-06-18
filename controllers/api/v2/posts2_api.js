module.exports.index1=function(req,res){
    return res.json(200,{
        message:"List of posts",
        posts:[]
    })
}