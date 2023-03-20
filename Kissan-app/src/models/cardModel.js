const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const cardSchema = new mongoose.Schema({
    cardNumber:{type:Number, default:0},
    cardType:{type:String, enum:["Regular", "Special"]},
    customerName:{type:String, required:true},
    status:{type:String, default:"Active", enum:["Active", "Inactive"]},
    vision:{type:String },
    customerId:{type: ObjectId, ref:"customer", required: true},
    isDeleted:{type:Boolean, default:false}
},{timestamps:true})

module.exports = mongoose.model("card", cardSchema);