const Post = require('../models/post');
const Reply = require('../models/reply');

exports.getPosts = async(req,res)=>{
    try{
        const posts = await Post.find({}).populate("author","-password");
        if(!posts){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(posts);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}

exports.getPost = async(req,res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id}).populate("author","-password");
        if(!post){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(post);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}

exports.createPost = async(req,res)=>{
    try{
        req.body.author = req.user;
        console.log(req.body.author);
        const post = await Post.create(req.body);
        if(!post){
            return res.status(400).json({'err':err.toString()});
        }
        res.json({post,'msg':'Post added successfully'});
    }
    catch(err){
        console.log(err.toString());
        res.status(500).json({'err':err.toString()});
    } 
}

exports.deletePost = async(req,res)=>{
    try{
        const post = await Post.findOneAndRemove({_id:req.params.id});
        if(!post){
            return res.status(400).json({'err':err.toString()});
        }
        res.json({'msg':'Deleted post successfully'});
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}

exports.getReplies = async(req,res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id});
        if(!post){
            return res.status(400).json({'err':err.toString()});
        } 
        const replies = await Reply.find({post:req.params.id}).populate("author","-password");
        if(!replies){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(replies);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}

exports.createReply = async(req,res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id});
        if(!post){
            return res.status(400).json({'err':err.toString()});
        }
        req.body.post = req.params.id;
        req.body.author = req.user;
        const reply = await Reply.create(req.body);
        if(!reply){
            return res.status(400).json({'err':err.toString()});
        }
        res.json({reply,'msg':'Replied successfully'});
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}

exports.getReply = async(req,res)=>{
    try{
        const reply = await Reply.findOne({_id:req.params.replyId}).populate("author","-password");
        if(!reply){
            return res.status(400).json({'err':err.toString()});
        }
        res.json(reply);
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}

exports.deleteReply = async(req,res)=>{
    try{
        const reply = await Reply.findOneAndRemove({_id:req.params.replyId},req.body);
        if(!reply){
            return res.status(400).json({'err':err.toString()});
        }
        res.json({'msg':'Deleted successfully'});
    }
    catch(err){
        res.status(500).json({'err':err.toString()});
    } 
}
