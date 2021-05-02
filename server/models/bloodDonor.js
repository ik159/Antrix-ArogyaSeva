const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloodDonorSchema = new Schema({
    bloodtype:{
        type:String,
        required:true
    },
    plasma:{
        type:Boolean,
        required:true
    },
    donor:{
        type:Schema.Types.ObjectId,
        ref:'User',
        unique:true
    }
});

module.exports = mongoose.model("BloodDonor",BloodDonorSchema);