const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required: true
    },
    author: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:Schema.Types.ObjectId,
        ref: 'Post'
    }
},{timestamps:true});

module.exports = mongoose.model('Reply',ReplySchema);