const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
        enum:['Financial help','Plasma Donor','Blood Donor','Other']
    },
    title:{
        type:String
    },
    content:{
        type: String,
        required : true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

module.exports = mongoose.model('Post',PostSchema);