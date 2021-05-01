const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubsciptionSchema = new Schema({
    endpoint:{
        type:String,unique:true,required:true
    },
    expirationTime:{type:Number},
    keys:{
        auth:String,
        p256dh:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    org:{
        type:Schema.Types.ObjectId,
        ref:'Org'
    }
});

module.exports = mongoose.model("Subscription",SubsciptionSchema);