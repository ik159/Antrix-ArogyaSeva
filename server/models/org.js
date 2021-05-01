const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const OrgSchema = new Schema({
    category:{
        type:String,
        required:true,
        enum:['Hospital','Pharmacy','Medical store','Oxygen dealer']
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    beds:{
        type:Number
    },
    icubeds:{
        type:Number
    },
    icuwitho2:{
        type:Number
    },
    supplies:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }]
},{timestamps:true});

OrgSchema.pre(
    'save',
    async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password,10);
        this.password = hash;
        next();
    }
);

OrgSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password,this.password);
    return compare;
}

module.exports = mongoose.model('Org',OrgSchema);